defmodule Boards.SessionHelper do
  alias Boards.{Repo, User} 

  @doc """
  When authenticating through Instagram
  """
  def authenticate(%{"access_token" => access_token, "user" => user}) do
    Repo.get_by(User, access_token: access_token, username: user["username"])
    |> return_result
  end

  @doc """
  When authenticating through Email/Password
  """
  def authenticate(%{"email" => email, "password" => password}) do
    user = Repo.get_by(User, email: String.downcase(email))
    user
    |> check_password(password)
    |> return_result(user)
  end

  # Handles result of password checking
  defp return_result(true, user), do: {:ok ,user}
  defp return_result(false, _user), do: :error
  # Handles result of database fetching
  defp return_result(%User{} = user), do: {:ok, user}
  defp return_result(user) when is_nil(user), do: :not_found
  
  # In the case that we find a user, check the passwords match 
  defp check_password(user, password) when is_map(user) do
    Comeonin.Bcrypt.checkpw(password, user.encrypted_password)
  end

  defp check_password(nil, _password), do: false
  
 end
