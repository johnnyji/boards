defmodule Boards.RegistrationController do
  use Boards.Web, :controller

  import IEx, only: [pry: 0]
  alias Boards.{Repo, User, ChangesetView, SessionView}

  # Only fills empty required params with `nil`s when the controller
  # action is :create
  plug :scrub_params, "user" when action in [:create]

  def create(conn, %{"user" => user_params}) do
    IEx.pry
    user_changeset = User.create_changeset(%User{}, user_params)
    
    case Repo.insert(user_changeset) do
      {:ok, user} ->
        IEx.pry
        {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user)
        conn
        |> put_status(201)
        |> render(SessionView, "show.json", jwt: jwt, user: user)
      {:error, changeset} ->
        IEx.pry
        conn
        |> put_status(422)
        |> render(ChangesetView, "error.json", changeset: changeset)
    end
  end
  
end