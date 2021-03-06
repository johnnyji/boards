# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :boards, Boards.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "SXxb5ztFzq/1mrzpChIYEuJF55D4caGwxcJGDg3usZ69qd2hgLX0ACTDqw6yHUrB",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: Boards.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false

# Configures Guardian
config :guardian, Guardian,
  issuer: "Boards",
  ttl: {3, :days},
  verify_issuer: true, # optional
  secret_key: "vcvNslHketeqR/50Ssz8gevnJcIoLXMq7PaUfjcI02BsSeHa3R1LbqDbx6+k1FF2",
  serializer: Boards.GuardianSerializer