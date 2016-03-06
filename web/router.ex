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
  end

  scope "/", Boards do
    pipe_through :browser # Use the default browser stack

    # Routing will be done on the front-end using `react-router`
    get "*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Boards do
  #   pipe_through :api
  # end
end
