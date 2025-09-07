import { loadEnv, defineConfig, Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,            // ← critical for /auth
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable",
    },
    cookieOptions: {
      sameSite: "none",
      secure: true,
    },
  },

  // Disable bundling/serving Admin at /app
  admin: {
    disable: true,
  },

  modules: [
    {
      resolve: Modules.CACHE,
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/auth",
      dependencies: [Modules.CACHE, ContainerRegistrationKeys.LOGGER],
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/auth-emailpass",
            id: "emailpass",
            options: {},
          },
        ],
      },
    },
  ],
})
