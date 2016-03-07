defmodule Boards.Router do
  use Boards.Web, :router
  import IEx, only: [pry: 0]

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :convert_to_snake_case
  end

  scope "/", Boards do
    pipe_through :browser

    # Routing will be done on the front-end using `react-router`
    get "*path", PageController, :index
  end

  scope "/api", Boards do
    pipe_through :api

    scope "/v1" do
      post "/registrations", RegistrationController, :create
    end
  end

  # Converts incoming params into `snake_case` so it matches the convention of Elixir
  defp convert_to_snake_case(conn, params) do
    IEx.pry
    IO.puts("body_params: " <> conn.body_params)
    IO.puts("body_params: " <> conn.body_params)
  end
    
end