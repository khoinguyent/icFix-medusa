#!/bin/sh

# Run migrations and start Medusa in dev mode
echo "Running database migrations..."
yarn medusa db:migrate || npx medusa db:migrate

echo "Starting Medusa dev server..."
yarn dev || npx medusa develop


