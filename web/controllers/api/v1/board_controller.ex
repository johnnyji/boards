defmodule Boards.BoardController do
  use Boards.Web, :controller

  # Ensures this controller is a auth protected controller
  plug Guardian.Plug.EnsureAuthenticated, handler: Phoenix.SessionController

  alias Boards.{Repo, Board}

  require IEx
  def index(conn, _params) do
    current_user = conn |> Guardian.Plug.current_resource

    # test = Repo.all from b in Boards,
    # where: b.user_id == current_user.id
    IEx.pry
    owned_boards = current_user
                   |> Ecto.assoc(:owned_boards)
                   |> Repo.preload_all
                   |> Repo.all


    conn
    |> render("index.json", owned_boards: owned_boards)
  end

  def create(conn, %{"board" => board_params}) do
    current_user = Guardian.Plug.current_resource

    # Create a changeset for a `board` that is associated with the current user
    # Ecto.build_assoc(current_user, :owned_boards) -> %Board{user_id: current_user.id}
    changeset = current_user
                |> Ecto.build_assoc(:owned_boards)
                |> Board.changeset(board_params)

    case changeset |> Repo.insert do
      {:ok, board} ->
        conn
        |> put_status(201)
        |> render("create.json", board: board)
      {:error, changeset} ->
        # TODO: is the reason the changeset here?
        IEx.pry
        conn
        |> put_status(422)
        |> render("error.json", changeset: changeset)
    end
  end

end
