defmodule Boards.CurrentUserController do
  use Boards.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: Boards.SessionController

  def show(conn, _) do
    # TODO: This request takes 5 seconds! Why??
    case conn |> decode_and_verify_token do
      {:ok, _claims} ->
        user = conn |> Guardian.Plug.current_resource
        conn
        |> put_status(200)
        |> render("show.json", user: user)
      {:error, _reason} ->
        conn
        |> put_status(422)
        |> render(Boards.SessionView, "error.json", error: "Not Found")
    end
  end

  # Gets the current JWT out of the `conn` and decodes it
  defp decode_and_verify_token(conn) do
    conn
    |> Guardian.Plug.current_token
    |> Guardian.decode_and_verify
  end

end
