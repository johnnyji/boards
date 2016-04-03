defmodule Boards.UserSocket do
  use Phoenix.Socket
  
  alias Boards.{GuardianSerializer, Repo, User}

  # Channels
  #
  # Routes which topics should be handled by which Channel module.
  # Here, any routes that begin with "user:" are handled by the UserChannel
  channel "users:*", Boards.UserChannel
  channel "boards:*", Boards.BoardsChannel

  # Transports
  transport :websocket, Phoenix.Transports.WebSocket

  # Fallback to long-polling in case web sockets aren't available
  transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  require IEx
  def connect(%{"jwt" => jwt}, socket) do
    case jwt |> Guardian.decode_and_verify do
      {:ok, claims} ->
        case claims["sub"] |> GuardianSerializer.from_token do
          {:ok, user} ->
            {:ok, assign(socket, :current_user, user)}
          {:error, _reason} ->
            :error
        end
      {:error, _reason} ->
        :error
    end
  end

  def connect(_params, _socket), do: :error

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "users_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     Boards.Endpoint.broadcast("users_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(socket), do: "users_socket:#{socket.assigns.current_user.id}" 

end
