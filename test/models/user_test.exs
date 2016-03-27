defmodule Boards.UserTest do
  # Tests that interact with the DB should NOT be flagged as async
  # See: http://www.phoenixframework.org/v0.14.0/docs/models
  use Boards.ModelCase
  alias Boards.{Repo, User}

  @valid_attrs %{
    first_name: "Johnny",
    last_name: "Ji",
    email: "johnny@johnnyji.com",
    encrypted_password: "helloworld",
    encrypted_password_confirmation: "helloworld"
  }

  test ".create_changeset is invalid if password and it's confirmation don't match" do
    attrs = %{@valid_attrs | encrypted_password: "worldhello"}
    assert {:encrypted_password_confirmation, "Please make sure your passwords match!"}
      in errors_on_create(%User{}, attrs)
  end

  test ".create_changeset is invalid if email is not the correct format" do
    attrs = %{@valid_attrs | email: "bademail"}
    assert {:email, "Please enter an appropriate email format"} in errors_on_create(%User{}, attrs)
  end

  test "email field must be unique" do
    changeset = User.create_changeset(%User{}, @valid_attrs) 
    {:ok, user} = Repo.insert(changeset)
    {:error, err_changeset} = Repo.insert(changeset)
    # TODO: Why is the error message not the custom one from the user create_changeset?
    assert {:email, "#{@valid_attrs.email} is already taken"} in err_changeset.errors
  end

end
