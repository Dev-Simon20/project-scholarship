"use server";

import { z } from "zod";
import { AuthError } from "next-auth";
import { signInValidateSchema } from "@/lib/signin_validate_schema";
import { prismaDb } from "@/lib/db";
import bcrypt from "bcryptjs";
function generarCodigoAleatorio(): string {
   const numero = Math.floor(10000000 + Math.random() * 90000000);
   return numero.toString();
}

export const registerAuth = async (
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
      const us = await prismaDb.user.create({
         data: {
            names: data.names,
            first_lastname: data.first_lastname,
            second_lastname: data.second_lastname,
            phone_number: data.phone_number,
            email: data.email.toLowerCase(),
            password: passwordHash,
            dni: generarCodigoAleatorio(),
         },
      });
      await prismaDb.student.create({
         data: {
            user_id: us.id,
            school_id: data.school_id,
            enrrolled_semesters: "8",
            code_university: data.code_university,
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
