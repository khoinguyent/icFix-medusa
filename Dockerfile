# Yarn flavor
FROM node:20-alpine

WORKDIR /server

# Install deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source
COPY . .

# Expose Medusa port
EXPOSE 9000

# Start via start.sh
CMD ["sh", "./start.sh"]


