defmodule Boards.ErrorViewTest do
  use Boards.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 404.html" do
    assert render_to_string(Boards.ErrorView, "404.html", []) == "Oops, we couldn&#39;t find what you were looking for!"
  end

  test "render 500.html" do
    assert render_to_string(Boards.ErrorView, "500.html", []) == "Ouch, Internal server error"
  end

  test "render any other" do
    assert render_to_string(Boards.ErrorView, "505.html", []) == "Ouch, Internal server error"
  end
end
