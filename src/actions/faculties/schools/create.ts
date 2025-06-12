"use server";

import { prismaDb } from "@/lib/db";
import { FacultySchema } from "@/schemas/faculty.schema";
import { SchoolSchema } from "@/schemas/school.schema";
import { AuthError } from "next-auth";
import { z } from "zod";

export const createSchool = async (values: z.infer<typeof SchoolSchema>) => {
   try {
      await prismaDb.school.create({
         data: {
            faculty_id:values.faculty_id,
            name: values.name,
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
