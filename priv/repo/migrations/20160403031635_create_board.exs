defmodule Boards.Repo.Migrations.CreateBoard do
  use Ecto.Migration

  def change do
    create table(:boards) do
      add :name, :string, null: false
      # :delete_all, ensures that all of the boards belonging to a user
      # are deleted when the user themselves are deleted
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps
    end
    create index(:boards, [:user_id])

  end
end
