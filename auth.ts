import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaDb } from "@/lib/db";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
   adapter: PrismaAdapter(prismaDb),
   ...authConfig,
   session: { strategy: "jwt" },
   callbacks: {
      jwt({ token, user }) {
         if (user) {
            token.id = user.id;
            token.role = user.role;
            token.names = user.names;
         }

         // Validar que las propiedades están
         if (!token.id || !token.role || !token.names) {
            throw new Error("JWT token is missing required properties.");
         }

         return token;
      },
      session({ session, token }) {
         if (!token.id || !token.role || !token.names) {
            throw new Error("Token is missing required fields.");
         }

         session.user.id = token.id as string;
         session.user.role = token.role as string;
         session.user.names = token.names as string;

         return session;
      },
   },
});
