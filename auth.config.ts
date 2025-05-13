import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Notice this is only an object, not a full Auth.js instance

export default {
   providers: [
      Credentials({
        credentials: {
        email: {},
        password: {},
      },
         authorize: async (credentials) => {
            if (credentials.email !== "test@unac.edu.pe") {
               throw new Error("invalid credentials");
            }
            
            const user: { id: string; name: string; email: string } = {
               id: "1",
               name: "Jeampeirl",
               email: "test@test.com",
            };
            return user;
         },
      }),
   ],
} satisfies NextAuthConfig;
