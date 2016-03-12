defmodule Boards.SessionController do
  use Boards.Web, :controller
  import Boards.SessionHelper, only: [authenticate: 1]

  plug :scrub_params, "session" when action in [:create]

  def create(conn, %{"session" => session_params}) do
    session_params
    |> authenticate
    |> create(conn)
  end
  defp create({:ok, user}, conn) do
    {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :token)
    conn
    |> put_status(201)
    |> render("show.json", jwt: jwt, user: user)
  end
  defp create(:error, conn) do
    conn
    |> put_status(422)
    |> render("error.json")
  end

  def delete do
  end

end