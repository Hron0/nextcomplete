'use server'
import { LoginSchema, RegisterSchema } from '@/schemas/index';
import bcrypt from "bcrypt"
import { z } from 'zod';
import { db } from './db';

export const Login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedField = LoginSchema.safeParse(values)

    if (!validatedField) {
       return {error: "Invalid data"} 
    }

    return {success: "Youre logged in dog"}
}

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields) {
       return {error: "Invalid data"} 
    }

    const {name, email, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await db.user.findUnique({
        where: {
            email,
        }
    })

    if (existingUser) {
        return {error: "Email is already taken. Try different one or Login into your account."}
    }

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    })

    return {success: "User created successfully"}
}