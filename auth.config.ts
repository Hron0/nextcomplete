import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import {LoginSchema} from "@/schemas/index"
import {getUserByEmail} from "@/lib/data/user"
import bcrypt from 'bcryptjs';
import { getUserById } from "./lib/data/user";

export default {
  providers: [Credentials({
    async authorize(credentials) {
      const validatedFields = LoginSchema.safeParse(credentials);

      if (validatedFields.success) {
        const {email, password} = validatedFields.data;

        const user = await getUserByEmail(email)
        if(!user || !user.password) return null

        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        )

        if(passwordMatch) return user
      }

      return null
    }
  })],
  callbacks: {
    async session({ token, session, user }) {
        if (token.sub && session.user) {
            session.user.id = token.sub
        }

        if (token.role && session.user) {
            session.user.role = token.role as "User" | "Admin";
        }

        return session
    },
    async jwt({ token }) {
        if (!token.sub) return token

        const existingUser = await getUserById(token.sub)
        if (!existingUser) return token

        token.role = existingUser.role

        return token
    }
}
} satisfies NextAuthConfig