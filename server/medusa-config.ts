import { loadEnv, defineConfig, Modules } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL || "redis://redis:6379",
    
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    
    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable",
    },
    
    // Cookie options for cross-domain
    cookieOptions: {
      sameSite: "none",    // Required for cross-domain
      secure: true,        // Required for HTTPS
      httpOnly: true,      // Security best practice
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  },
  
  admin: {
    disable: true, // Admin served from Vercel
  },
  
  modules: [
    {
      key: Modules.CACHE,
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL || "redis://redis:6379"
      },
    },
    {
      key: Modules.AUTH,
      resolve: "@medusajs/medusa/auth",
      options: {
        providers: [
          {
            resolve: "@medusajs/auth-emailpass",
            id: "emailpass",
            scope: "admin"
          },
        ],
      },
    },
  ],
})
