"use server";

import { z } from "zod";
import { logInSchema } from "@/lib/login_validate_schema";
import { AuthError } from "next-auth";
import { signIn } from "@nextAuth/auth";
export const logInAction = async (values: z.infer<typeof logInSchema>) => {
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
      return { error: "error 500" };
   }
};
