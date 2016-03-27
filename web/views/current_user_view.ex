defmodule Boards.CurrentUserView do
  use Boards.Web, :view
  alias Boards.User
  
  def render("show.json", %{user: user}) do
    # Here we must manually specify which user attributes to return because:
    #
    # 1. `Poison.encode` cannot JSONify the `__meta__` and `__struct__` keys on structs
    # 2. This user is grabbed from `Guardian.current_resource`, therefore the `@derive` we
    # specified on the user model won't take effect
    %{user: user |> Map.take(User.get_public_fields)}
    |> ProperCase.to_camel_case
  end

end
