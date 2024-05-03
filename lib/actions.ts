'use server'
import { LoginSchema, RegisterSchema } from '@/schemas/index';
import bcrypt from "bcryptjs"
import { z } from 'zod';
import { db } from '../../next-playground/lib/db';
import { signIn } from '@/auth';
import { DEFAUL_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from 'next-auth';

export const Login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedField = LoginSchema.safeParse(values)

    if (!validatedField) {
        return { error: "Invalid data" }
    }

    const { email, password } = validatedField.data;
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAUL_LOGIN_REDIRECT
        })
    } catch(error) {
        if (error instanceof AuthError) {
            switch (error.type){
                case "CredentialsSignin":
                    return {error: "Bad credentials"}
                default:
                    return {error: "Something went wrong"}
            }
        }

        throw error
    }
}

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields) {
        return { error: "Invalid data" }
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await db.user.findUnique({
        where: {
            email,
        }
    })

    if (existingUser) {
        return { error: "Email is already taken. Try different one or Login into your account." }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: "User created successfully" }
}