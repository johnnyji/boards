defmodule Boards.SessionView do
  @moduledoc """
  Views are comprised on render functions that take in a view name, and
  a map of attributes to render (called by the controller originally as a keyword list).

  The `render` functions of views will each return a map which will be the data transformed
  into JSON and sent over to our front-end   
  """
  use Boards.Web, :view

  def render("show.json", %{jwt: jwt, user: user}) do
    %{
      jwt: jwt,
      user: user
    }
  end  

  def render("error.json") do
    %{error: "Invalid Username or Password"}
  end

end