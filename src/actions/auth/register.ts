"use server";

import { z } from "zod";
import { AuthError } from "next-auth";
import { signInValidateSchema } from "@/lib/signin_validate_schema";
import { prismaDb } from "@/lib/db";
import bcrypt from "bcryptjs";

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
      await prismaDb.user.create({
         data: {
            names: data.names,
            first_lastname: data.first_lastname,
            second_lastname: data.second_lastname,
            phone_number: data.phone_number,
            email: data.email.toLowerCase(),
            password: passwordHash,
         },
      });
      // await prismaDb.student.create({
      //    data:{
      //       user_id:getUser.id,
      //       school_id:0,
      //       enrrolled_semesters:'10',
      //       code_university:'1815260049'
      //    }
      // })
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
