import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins"
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            ...schema
        },
    }),
    user: {
        additionalFields: {
            sem: {
                type: "number",
                defaultValue: 1,
            },
            roll_number: {
                type: "string",
                required: true,
            },
            phone_number: {
                type: "string",
                required: true,
            },
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    plugins: [
        nextCookies(),
        admin(),
    ]
});