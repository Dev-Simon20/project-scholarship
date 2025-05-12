import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prismaDb } from "@/lib/db"
import authConfig from "./auth.config"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prismaDb),
  ...authConfig,
  session:{strategy:"jwt"}
})