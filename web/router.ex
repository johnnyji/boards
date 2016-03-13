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
    plug :proper_case_params
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/", Boards do
    pipe_through :browser

    post "/session", SessionController, :create
    delete "/session", SessionController, :delete

    # Routing will be done on the front-end using `react-router`
    get "*path", PageController, :index
  end

  scope "/api", Boards do
    pipe_through :api

    scope "/v1" do
      post "/registrations", RegistrationController, :create
    end
  end

  # Transforms incoming responses from `camelCase` to `snake_case`
  defp proper_case_params(conn, _opts) do
    %{conn | params: snake_case_params(conn.params)}
  end

  # Transforms outgoing responses from `snake_case` to camelCase
  defp proper_case_params(%Plug.Conn{resp_body: resp_body} = conn, _opts) when is_map(resp_body) do
    %{conn | resp_body: camel_case_params(resp_body)} 
  end

  defp camel_case_params(params) when is_map(params) do
    for {key, val} <- params,
      into: %{},
      do: {camel_case(key), camel_case_params(val)}
  end
  defp camel_case_params(final_val), do: final_val
  defp camel_case(string) do
    class_cased_string = string |> Mix.Utils.camelize
    first_char = class_cased_string |> String.first
    class_cased_string |> String.replace(first_char, String.downcase(first_char))
  end

  defp snake_case_params(%{} = params) do
    for {key, val} <- params,
      into: %{},
      do: {snake_case(key), snake_case_param(val)}
  end
  defp snake_case_params(final_val), do: final_val

  defp snake_case(string), do: key |> Mix.Utils.underscore

end
