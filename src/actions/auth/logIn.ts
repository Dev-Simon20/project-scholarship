"use server";

import { z } from "zod";
import { logInSchema } from "@/lib/login_validate_schema";
import { AuthError } from "next-auth";
import { signIn } from "@nextAuth/auth";
export const logInAuth = async (values: z.infer<typeof logInSchema>) => {
   try {
      await signIn("credentials", {
         email: values.email,
         password: values.password,
         redirect: false,
      });
      return { success: true };
   } catch (error) {
      if (error instanceof AuthError) {
         return { error: error.cause?.err?.message };
      }
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return { error: "Error desconosido " };
   }
};
