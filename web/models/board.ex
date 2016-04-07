defmodule Boards.Board do
  use Boards.Web, :model

  @public_fields [:id, :name, :user]
  # Ensures that only the following fields are ever returned
  # from a DB query for a Board
  @derive {Poison.Encoder, only: @public_fields}

  schema "boards" do
    field :name, :string
    belongs_to :user, Boards.User

    timestamps
  end

  @required_fields ~w(name user_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def get_public_fields do
    @public_fields
  end
end
