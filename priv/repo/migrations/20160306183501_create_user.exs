defmodule Boards.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :access_token, :string
      add :email, :string
      add :encrypted_password, :string
      add :first_name, :string
      add :last_name, :string
      add :profile_picture, :string
      add :username, :string

      timestamps
    end

    # Makes sure the email field is always unique
    create unique_index(:users, [:email], message: "That email is already taken")
  end
end
