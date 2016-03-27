defmodule Boards.User do
  use Boards.Web, :model
  alias Ecto.Changeset

  # Fields that are allowed to be exposed when querying users
  @public_fields [:id, :first_name, :last_name, :email]
  
  # Specifies which fields should be serialized into JSON from the User struct.
  # We manually declare this for two reasons:
  # 
  # 1. The `encrypted_password` field should not be required by the front-end or sent
  # 2. Because User is a struct, the `__meta__` field is not parsed properly by the poison encoder.
  #    Therefore we need to leave that field out in order for our data to be properly JSON encoded
  #
  # See: http://stackoverflow.com/questions/32549712/encoding-a-ecto-model-to-json-in-elixir/32553676#32553676
  # See: https://coderwall.com/p/fhsehq/fix-encoding-issue-with-ecto-and-poison
  @derive {Poison.Encoder, only: @public_fields}

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :encrypted_password, :string

    timestamps
  end

  @required_fields ~w(first_name last_name email encrypted_password)
  @optional_fields ~w()

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

  
  @doc """
  Exposes the list of fields that a user will return when queried
  """
  def get_public_fields do
    @public_fields
  end

  defp generate_encrypted_password(%Changeset{changes: %{encrypted_password: password}} = changeset) do
    Changeset.put_change(changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
  end

  defp generate_encrypted_password(changeset), do: changeset

end
