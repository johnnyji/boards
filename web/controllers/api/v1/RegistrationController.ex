defmodule Boards.RegistrationController do
  use Boards.Web, :controller

  alias Boards.{Repo, User, SessionView}

  # Only fills empty required params with `nil`s when the controller
  # action is :create
  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params}) do
    user_changeset = User.create_changeset(%User{}, user_params)
    
    case Repo.insert(user_changeset) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user)
        conn
        |> put_status(201)
        |> render(SessionView, "show.json", jwt: jwt, user: user)
      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(RegistrationView, "error.json", changeset: changeset)
    end
  end
end