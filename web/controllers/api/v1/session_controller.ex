defmodule Boards.SessionController do
  use Boards.Web, :controller
  import Boards.SessionHelper, only: [authenticate: 1]

  plug :scrub_params, "session" when action in [:create]

  require IEx
  def create(conn, %{"session" => session_params}) do
    IEx.pry
    case session_params |> authenticate do
      {:ok, user} ->
        IEx.pry
        {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :token)
        conn
        |> put_status(201)
        |> render("show.json", jwt: jwt, user: user)
      {:error, _reason} ->
        IEx.pry
        conn
        |> put_status(422)
        |> render("error.json", error: "Invalid Username/Password") 
    end
  end

  def delete do
  end

  # Called when Guardian fails to authenticate
  def unauthenticated(conn, _) do
    conn
    |> put_status(403)
    |> render(Boards.SessionView, "forbidden.json", error: "Unauthenticated")
    # Here we have to specify we're using the `SessionView` because
    # this function can be also triggered from the `CurrentUserController`
  end

end
