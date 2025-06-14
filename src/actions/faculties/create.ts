"use server";

import { prismaDb } from "@/lib/db";
import { FacultySchema } from "@/schemas/faculty.schema";
import { AuthError } from "next-auth";
import { z } from "zod";

export const createFaculty = async (values: z.infer<typeof FacultySchema>) => {
   try {
      await prismaDb.faculty.create({
         data: {
            name: values.name,
            creation_date: values.creation_date,
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
