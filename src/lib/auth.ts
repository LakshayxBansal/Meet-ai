import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"; // To import all schema tables
 
export const auth = betterAuth({
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
        linkedin: { 
            clientId: process.env.LINKEDIN_CLIENT_ID as string, 
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string, 
        }, 
        twitter: { 
            clientId: process.env.TWITTER_CLIENT_ID as string, 
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string, 
        }, 
    },
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: { ...schema},
    }),
});