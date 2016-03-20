defmodule Boards.CurrentUserView do
  use Boards.Web, :view

  def render("show.json", %{user: user}) do
    %{user: user} 
  end
end
