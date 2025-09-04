#!/bin/sh
set -e

# Ensure admin bundle exists; build if missing (fallback for CI images without admin)
if [ ! -f ".medusa/admin/index.html" ]; then
  echo "Admin bundle missing; building admin and server artifacts..."
  npx medusa build || yarn build || npm run build
fi

exec npm run start


