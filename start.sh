#!/bin/sh

# Optionally run migrations
if [ "$MIGRATE_ON_START" = "true" ] || [ "$MIGRATE_ON_START" = "1" ]; then
  echo "Running database migrations..."
  yarn medusa db:migrate || npx medusa db:migrate
else
  echo "Skipping database migrations (set MIGRATE_ON_START=true to enable)."
fi

echo "Starting Medusa dev server..."
yarn dev || npx medusa develop


