defmodule Boards.UserChannel do
  @moduledoc """
  Handles incoming and outgoing channel events that begin with
  "user:", aka user related events
  """
  use Boards.Web, :channel

  def join("users:" <> _user_id, _params, socket) do
    {:ok, socket}
  end
  
end
