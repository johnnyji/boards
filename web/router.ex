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
    plug :snake_case_params
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

   # Calls the internal functions to convert the params appropriately
  defp snake_case_params(conn, _opts) do
    IEx.pry
    %{conn | params: snake_case_param(conn.params)}
  end

  # Traverses through each k/v pair and recursively converts keys into `snake_case`
  defp snake_case_param(%{} = params) do
    for {key, val} <- params,
      into: %{},
      do: {snake_case_key(key), snake_case_param(val)}
  end
  # When we've traversed the map and come to the final value, we return that value
  defp snake_case_param(value), do: value

  defp snake_case_key(key) do
    key
    |> String.replace(~r/([A-Z]+)([A-Z][a-z])/, ~S"\1_\2")
    |> String.replace(~r/([a-z\d])([A-Z])/, ~S"\1_\2")
    |> String.replace(~r/-/, "_")
    |> String.downcase
  end

end
