##########
# deps
##########
FROM node:20-alpine AS deps
WORKDIR /app

# Install all dependencies (including dev) for building
COPY package.json yarn.lock ./
RUN corepack enable \
  && corepack prepare yarn@1.22.22 --activate \
  && yarn --version \
  && yarn install --frozen-lockfile

##########
# build
##########
FROM node:20-alpine AS build
WORKDIR /app

ENV NODE_ENV=production
ARG BUILD_REV

# Reuse deps from previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the project (outputs to dist/ via medusa build)
RUN echo "BUILD_REV=${BUILD_REV}" \
  && corepack enable \
  && corepack prepare yarn@1.22.22 --activate \
  && yarn build \
  && ls -lah .medusa/admin || true \
  && test -f .medusa/admin/index.html

##########
# runner
##########
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies
COPY package.json yarn.lock ./
RUN corepack enable \
  && corepack prepare yarn@1.22.22 --activate \
  && yarn install --frozen-lockfile --production=false \
  && apk add --no-cache curl

# Copy built artifacts and any required runtime files
# Medusa outputs compiled server to .medusa
COPY --from=build /app/.medusa ./.medusa
COPY medusa-config.ts ./medusa-config.ts
COPY tsconfig.json ./tsconfig.json

# Expose Medusa port
EXPOSE 9000

# HEALTHCHECK on /health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -fsS http://localhost:9000/health || exit 1

# Start Medusa server
CMD ["npm", "run", "start"]


