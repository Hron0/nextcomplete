import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
  publicRoutes,
  adminRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAUL_LOGIN_REDIRECT
} from "@/routes"
import { NextResponse } from 'next/server';
const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAdmin = req.auth?.user.role === "Admin"


  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAUL_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  if (isAdminRoute) {
    if (isAdmin) {
      return NextResponse.next()
    }
    return Response.redirect(new URL(DEFAUL_LOGIN_REDIRECT, nextUrl))
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth", nextUrl))
  }


  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}