defmodule Boards.SessionHelper do
  alias Boards.{Repo, User} 
  require IEx
  
  def authenticate(%{"email" => email, "password" => password}) do
    user = Repo.get_by(User, email: String.downcase(email))
    user
    |> check_password(password)
    |> return_result(user)
  end

  defp return_result(true, user), do: {:ok ,user}
  defp return_result(false, _user), do: :error
  
  # In the case that we find a user, check the passwords match 
  defp check_password(user, password) when user |> is_map do
    Comeonin.Bcrypt.checkpw(user["encrypted_password"], password)
  end

  defp check_password(nil, _password), do: false
  
 end
