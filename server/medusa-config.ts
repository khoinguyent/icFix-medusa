import { loadEnv, defineConfig, Modules } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,  // used for sessions & queues
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!, // must include your Vercel origin
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable",
    },
    cookieOptions: {
      sameSite: "none", // required for cross-site cookies
      secure: true,     // since you’re serving over HTTPS
    },
  },

  admin: {
    disable: true, // admin is served from Vercel, not Medusa
  },

  modules: [
    {
      key: Modules.CACHE,
      resolve: "@medusajs/cache-redis",
      options: { redisUrl: process.env.REDIS_URL },
    },
    {
      // IMPORTANT: use @medusajs/auth (not @medusajs/medusa/auth)
      key: Modules.AUTH,              // or key: "auth"
      resolve: "@medusajs/auth",
      options: {
        providers: [
          { resolve: "@medusajs/auth-emailpass", id: "emailpass" },
        ],
      },
    },
    // },
    // {
    //   key: Modules.CACHE,                // required: gives the module a service key
    //   resolve: "@medusajs/cache-redis",  // proper Redis cache module
    //   options: {
    //     redisUrl: process.env.REDIS_URL, // e.g. redis://redis:6379
    //   },
    // },
    // {
    //   resolve: "@medusajs/medusa/auth",  // core auth module
    //   options: {
    //     providers: [
    //       {
    //         resolve: "@medusajs/auth-emailpass", // correct package for v2
    //         id: "emailpass",
    //         options: {},
    //       },
    //     ],
    //   },
    // },
  ],
})
