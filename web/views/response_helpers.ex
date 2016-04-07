defmodule Boards.ResponseHelper do
  
  require IEx
  def parse_errors(%Changeset{} = changeset) do
    IEx.pry
    Enum.map(changeset.errors, fn({field, detail}) -> do
      %{} |> Map.put(field, detail)
    end)
  end

end
