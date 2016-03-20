defmodule Boards.SessionController do
  require IEx
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
      {:error, _reason} ->
        conn
        |> put_status(422)
        |> render("error.json") 
    end
  end

  def delete do
  end

  # Called when Guardian fails to authenticate
  def unauthenticated(conn, _) do
    IEx.pry
    # TODO Should I be rendering `error.json`?
    conn
    |> put_status(403)
    |> render("error.json")
  end

end
