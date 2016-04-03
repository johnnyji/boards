defmodule Boards.BoardsChannel do
  use Boards.Web, :channel

  def join("boards:" <> _boards_id, _params, socket) do
    {:ok, socket}
  end
  
end
