"use server";
import { prismaDb } from "@/lib/db";
import { Faculty } from "@/types/faculty";
import { School } from "@/types/school";
import { AuthError } from "next-auth";

export const getAllSchools = async () => {
   try {
      const schools: School[] = await prismaDb.school.findMany();
      return schools;
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
