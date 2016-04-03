defmodule Boards.SessionView do
  @moduledoc """
  Views are comprised of render functions that take in a view name, and
  a map of attributes to render (called by the controller originally as a keyword list).

  The `render` functions of views will each return a map which will be the data transformed
  into JSON and sent over to our front-end   
  """
  use Boards.Web, :view
  alias Boards.User

  @doc """
  Since we've already specified the fields to serialize from the User struct in
  user.ex, we can just return the user as a normal map without having to use the
  `render_one` or `render_many` options

  See: http://stackoverflow.com/questions/33281803/returning-a-list-gives-poison-encodeerror-unable-to-encode-value
  """
  def render("show.json", %{jwt: jwt, user: user}) do
    %{
      jwt: jwt,
      user: user |> Map.take(User.get_public_fields)
    }
    |> ProperCase.to_camel_case
  end

  @doc """
  Must provide some sort of a key/value in response so that the `whatwg-fetch` library
  in JavaScript can parse it properly
  """
  def render("delete.json", _) do 
    %{ok: true}
  end

  def render("error.json", %{error: error}), do: %{error: error}

  def render("forbidden.json", %{error: error}), do: %{error: error}

end
