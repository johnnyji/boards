defmodule Boards.User do
  use Boards.Web, :model

  import Comeonin.Bcrypt
  alias Ecto.Changeset

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :encrypted_password, :string

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
    |> validate_format(:email, ~r/@/, message: 'Please enter an appropriate format for your email.')
    |> validate_length(:password, min: 5, message: 'Passwords should be at least 6 characters')
    # Creates a virtual field called `password_confirmation` which will not be inserted into the DB
    |> validate_confirmation(:password, message: 'Please make sure your passwords match!')
    |> unique_constraint(:email, message: "This email is already taken.")
    |> generate_encrypted_password
  end

  defp generate_encrypted_password(%Changeset{valid?: true, changes: %{password: password}} = changeset) do
    # puts the newly encrypted password as the :encrypted_password field in the changeset
    changeset
    |> put_change(:encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
  end

  defp generate_encrypted_password(changeset), do: changeset

end