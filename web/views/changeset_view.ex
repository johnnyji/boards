defmodule Boards.ChangesetView do
  use Boards.Web, :view

  @doc """
  Traverses and translates changeset errors.

  See `Ecto.Changeset.traverse_errors/2` and
  `Boards.ErrorHelpers.translate_error/1` for more details.
  """
  def translate_errors(changeset) do
    changeset
    |> Ecto.Changeset.traverse_errors(&translate_error/1)
  end

  def render("error.json", %{changeset: changeset}) do
    # When encoded, the changeset returns its errors
    # as a JSON object. So we just pass it forward.
    %{errors: translate_errors(changeset)}
  end
end
