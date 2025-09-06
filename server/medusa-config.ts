import { loadEnv, defineConfig } from "@medusajs/framework/utils"
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
    // Optional but useful locally when testing cross-site cookies:
    // cookieOptions: { sameSite: "lax" }, // or "none" with HTTPS+secure
    cookieOptions: {
      sameSite: "none",  // required for cross-site cookies
      secure: false,      // required when sameSite=none
    },
  },

  // Disable bundling/serving Admin at /app
  admin: {
    disable: true,
  },

  // Auth module provider (email+password). It’s registered by default,
  // but you can override/extend options here if you want.
  modules: [
    {
      resolve: "@medusajs/medusa/auth",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/auth-emailpass",
            id: "emailpass",
            options: {
              // e.g. hashConfig if you want to change scrypt params
            },
          },
        ],
      },
    },
  ],
})
