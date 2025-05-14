"use server";

import { z } from "zod";
import { logInSchema } from "@/lib/login_validate_schema";
import { AuthError } from "next-auth";
import { signIn } from "@nextAuth/auth";
import { signInValidateSchema } from "@/lib/signin_validate_schema";
import { prismaDb } from "@/lib/db";
import bcrypt from "bcryptjs";
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
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return { error: "Error desconosido " };
   }
};

export const registerAction = async (
   values: z.infer<typeof signInValidateSchema>
) => {
   const { success, data } = signInValidateSchema.safeParse(values);
   try {
      if (!success) {
         throw new Error("Invalid Data");
      }
      console.log("Ignoro el invalid Data");
      const user = await prismaDb.user.findUnique({
         where: {
            email: data.email.toLowerCase(),
         },
      });
      if (user) {
         throw new Error("User already exist");
      }
      const passwordHash = await bcrypt.hash(data.password, 10);
      await prismaDb.user.create({
         data: {
            names: data.names,
            first_lastname: data.first_lastname,
            second_lastname: data.second_lastname,
            phone_number: data.phone_number,
            email: data.email.toLowerCase(),
            code_university: data.code_university,
            password: passwordHash,
         },
      });
      return {
         success: true,
      };
   } catch (error) {
      if (error instanceof AuthError) {
         return {
            error: error.cause?.err?.message,
         };
      }
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return {
         error: "Error desconocido",
      };
   }
};
