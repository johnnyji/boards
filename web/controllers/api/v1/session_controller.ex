defmodule Boards.SessionController do
  use Boards.Web, :controller
  import Boards.SessionHelper, only: [authenticate: 1]

  plug :scrub_params, "session" when action in [:create]

  def create(conn, %{"session" => session_params}) do
    case session_params |> authenticate do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :token)
        conn
        |> put_status(201)
        |> render("show.json", jwt: jwt, user: user)
      :error ->
        conn
        |> put_status(422)
        |> render("error.json") 
    end
  end

  def delete do
  end

end