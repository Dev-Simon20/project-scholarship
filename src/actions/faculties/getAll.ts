'use server'
import { prismaDb } from "@/lib/db";
import { Faculty } from "@/types/faculty";
import { AuthError } from "next-auth";

export const getAllFaculties = async () => {
   try {
      const faculties: Faculty[] = await prismaDb.faculty.findMany({
         include: {
            schools: true,
         },
      });
      return faculties;
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
