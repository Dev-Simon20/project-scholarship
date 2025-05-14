import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Notice this is only an object, not a full Auth.js instance
import bcrypt from "bcryptjs";
import { logInSchema } from "@/lib/login_validate_schema";
import { prismaDb } from "@/lib/db";

export default {
   providers: [
      Credentials({
         credentials: {
            email: {},
            password: {},
         },
         authorize: async (credentials) => {
            const { data, success } = logInSchema.safeParse(credentials);
            if (!success) {
               throw new Error("Credenciales invalidas");
            }
            const user = await prismaDb.user.findUnique({
               where: {
                  email: data.email,
               },
            });
            if (!user || !user.password) {
               throw new Error("No user found");
            }

            const isvalid = await bcrypt.compare(data.password, user.password);

            if (!isvalid) {
               throw new Error("Incorrect oassword");
            }
            return user;
         },
      }),
   ],
} satisfies NextAuthConfig;
