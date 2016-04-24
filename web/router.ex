defmodule Boards.Router do
  use Boards.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug ProperCase.Plug.SnakeCaseParams
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Boards do
    pipe_through :api

    scope "/v1" do
      post "/registrations", RegistrationController, :create

      get "/current_user", CurrentUserController, :show
      post "/session", SessionController, :create
      post "/session/instagram", SessionController, :create_instagram
      delete "/session", SessionController, :delete 

      resources "boards", BoardsController, only: [:index, :create]
    end
  end

  scope "/", Boards do
    pipe_through :browser
    # Routing will be done on the front-end using `react-router`
    get "*path", PageController, :index
  end

end
