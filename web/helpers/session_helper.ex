defmodule Boards.SessionHelper do
  alias Boards.{Repo, User} 

  def authenticate(%{"email" => email, "password" => password}) do
    user = Repo.get_by(User, email: String.downcase(email))

    user
    |> check_password(password)
    |> return_result(user)
  end

  defp return_result(true, user), do: {:ok ,user}
  defp return_result(false, _user), do: :error
  
  # In the case that we find a user, check the passwords match 
  defp check_password(%{"encrypted_password" => encrypted_password}, password) do
    Comeonin.Bcrypt.checkpw(user.encrypted_password, encrypted_password)
  end

  defp check_password(nil, password), do: false
  
 end