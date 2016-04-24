defmodule Boards.ResponseHelper do
  
  def parse_errors(%{} = changeset) do
    Enum.map(changeset.errors, fn {field, detail} ->
      %{} |> Map.put(field, detail)
    end)
  end

end
