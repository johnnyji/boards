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
    plug :proper_case_params
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
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

      post "/session", SessionController, :create
      delete "/session", SessionController, :delete 
    end
  end

  # Transforms incoming responses from `camelCase` to `snake_case`,
  # no need to worry about outgoing params as they are handled by our
  # JSON views (?)
  defp proper_case_params(conn, _opts) do
    %{conn | params: snake_case_params(conn.params)}
  end

  defp snake_case_params(%{} = params) do
    for {key, val} <- params,
      into: %{},
      do: {snake_case(key), snake_case_params(val)}
  end

  defp snake_case_params(final_val), do: final_val

  defp snake_case(string), do: string |> Mix.Utils.underscore

end
