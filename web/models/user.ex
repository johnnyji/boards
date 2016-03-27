defmodule Boards.User do
  use Boards.Web, :model
  alias Ecto.Changeset

  # Specifies which fields should be serialized into JSON from the User struct.
  # We manually declare this for two reasons:
  # 
  # 1. The `encrypted_password` field should not be required by the front-end or sent
  # 2. Because User is a struct, the `__meta__` field is not parsed properly by the poison encoder.
  #    Therefore we need to leave that field out in order for our data to be properly JSON encoded
  #
  # See: http://stackoverflow.com/questions/32549712/encoding-a-ecto-model-to-json-in-elixir/32553676#32553676
  # See: https://coderwall.com/p/fhsehq/fix-encoding-issue-with-ecto-and-poison
  @derive {Poison.Encoder, only: [:first_name, :last_name, :email]}

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :encrypted_password, :string
    field :encrypted_password_confirmation, :string, virtual: true

    timestamps
  end

  @required_fields ~w(first_name last_name email encrypted_password)
  @optional_fields ~w()

  # Excludes the password from being returned by the DB
  @derive {Poison.Encoder, except: [:encrypted_password]}

  @doc """
  The changeset transformations to run on user creation

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def create_changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_format(:email, ~r/@/, message: "Please enter an appropriate email format")
    |> validate_length(:encrypted_password, min: 6, message: "Passwords should be at least 6 characters")
    # Creates a virtual field called `password_confirmation` which will not be inserted into the DB
    |> validate_confirmation(:encrypted_password, message: "Please make sure your passwords match!")
    |> unique_constraint(:email, message: "#{params["email"]} is already taken")
    |> generate_encrypted_password
  end

  defp generate_encrypted_password(%Changeset{valid?: true, changes: %{password: password}} = changeset) do
    # puts the newly encrypted password as the :encrypted_password field in the changeset
    %{changeset | encrypted_password: Comeonin.Bcrypt.hashpwsalt(password)}
  end

  defp generate_encrypted_password(changeset), do: changeset

end
