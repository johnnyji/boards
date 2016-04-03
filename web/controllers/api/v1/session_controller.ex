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
        |> render("error.json", error: "Invalid Username/Password") 
    end
  end

  def delete(conn, _) do
    # Retrieves the currently valid session claims
    case conn |> Guardian.Plug.claims do
      {:ok, claims} ->
        conn
        |> Guardian.Plug.current_token # Retrieves the currently valid JWT
        |> Guardian.revoke!(claims) # Revokes the current JWT (signing out the user)
        
        conn
        |> render("delete.json")
      {:error, _reason} ->
        conn
        |> put_status(422)
        |> render("error.json", error: "Unable to logout")
    end
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
