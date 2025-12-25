import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  plugins: [openAPI()],
  emailAndPassword: {
    baseURL: "https://localhost:3000",
    enabled: true,
    requireEmailVerification: false,
  },
  trustedOrigins: [
    "https://localhost:3000",
    "https://localhost:5173",
    "https://192.168.100.9:3000",
    "https://192.168.100.9:5173",
    "https://localhost:8080",
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      attributes: {},
    },
  },
  // Força o uso de cookies
  advanced: {
    generateId: () => crypto.randomUUID(),
    cookiePrefix: "better-auth",
    useSecureCookies: false,
    defaultCookieAttributes: {
      sameSite: "None",
      secure: true,
      partitioned: true,
    },
  },
});
