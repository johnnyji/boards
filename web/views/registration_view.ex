defmodule Boards.RegistrationView do
  use Boards.Web, :view

  def render("error.json", %{changeset: changeset}) do
    errors = changeset.errors
    |> Enum.into(%{})
    |> ProperCase.to_camel_case
    %{errors: errors}
  end

end
