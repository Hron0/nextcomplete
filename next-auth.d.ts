import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: "User" | "Admin"
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}