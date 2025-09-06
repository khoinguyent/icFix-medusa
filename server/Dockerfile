FROM node:20-alpine

WORKDIR /server

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

# helpful for local PG via Docker
ENV NODE_ENV=development

EXPOSE 9000

# run migrations then start dev server
CMD ["sh", "-c", "yarn db:setup && yarn dev"]
