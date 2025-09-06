import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable",
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    // Disable admin UI when running API-only
    disable: process.env.ADMIN_DISABLED === "true" || false,
  },
  modules: {
    [Modules.AUTH]: {
      resolve: "@medusajs/auth",
      options: {
        providers: [
          {
            resolve: "@medusajs/auth-emailpass",
            id: "emailpass",
            resources: ["admin"],
            options: {},
          },
          {
            id: "session",
            resources: ["admin"],
            options: {
              cookie_name: process.env.SESSION_COOKIE_NAME || "connect.sid",
              secret: process.env.COOKIE_SECRET || "supersecret",
              expires_in: "7d",
            },
          },
        ],
      },
    },
  },
})
