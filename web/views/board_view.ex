defmodule Boards.BoardView do
  use Boards.Web, :view
  require IEx
  alias Boards.{Board, ResponseHelper}

  def render("index.json", %{owned_boards: owned_boards} = boards) do
    boards
      |> ProperCase.to_camel_case
  end

  def render("show.json", %{board: board}) do
    # TODO: Is the `get_public_fields necessary here?`
    IEx.pry
    %{board: Map.take(board, Board.get_public_fields)}
      |> ProperCase.to_camel_case
  end

  def render("error.json", %{changeset: changeset}) do
    %{errors: changeset |> ResponseHelper.parse_errors}
  end
  
end
