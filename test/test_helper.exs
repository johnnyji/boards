ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Boards.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Boards.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Boards.Repo)

