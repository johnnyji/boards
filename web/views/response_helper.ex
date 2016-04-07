defmodule Boards.ResponseHelper do
  
  require IEx
  def parse_errors(%Changeset{} = changeset) do
    IEx.pry
    # TODO: Whats wrong with this syntax?
    Enum.map(changeset.errors, fn ({field, detail}) ->
      %{} |> Map.put(field, detail)
    end)
  end

end
