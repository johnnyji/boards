defmodule Boards.SessionView do
  @moduledoc """
  Views are comprised of render functions that take in a view name, and
  a map of attributes to render (called by the controller originally as a keyword list).

  The `render` functions of views will each return a map which will be the data transformed
  into JSON and sent over to our front-end   
  """
  use Boards.Web, :view

  @doc """
  Since we've already specified the fields to serialize from the User struct in
  user.ex, we can just return the user as a normal map without having to use the
  `render_one` or `render_many` options

  See: http://stackoverflow.com/questions/33281803/returning-a-list-gives-poison-encodeerror-unable-to-encode-value
  """
  def render("show.json", %{jwt: jwt, user: user}) do
    %{
      jwt: jwt,
      user: user
    }
    |> ProperCase.to_camel_case
  end
  
  @doc """
  Returns an error message if the session wasn't authenticated properly
  """
  def render("error.json", _), do: %{error: "Invalid Username or Password"}

end
