'use server'
import { prismaDb } from "@/lib/db";
import { SocialWorkerFormData } from "@/types/social-worker";

export const getSocialWorkerById = async (id: string) => {
   try {
      if (!id) throw new Error("No se envio el id!");
      const data = await prismaDb.socialWorker.findFirst({
         where: {
            user_id: id,
         },
         include: {
            user: true,
            assigned_faculties: true,
         },
      });
      if (!data) throw new Error("El usuario no exixte!");
      const transformData: SocialWorkerFormData = {
         names: data.user.names,
         first_lastname: data.user.first_lastname,
         second_lastname: data.user.first_lastname,
         phone_number: data.user.phone_number,
         dni: data.user.dni || "-",
         email: data.user.email,
         social_worker_status: data.social_worker_status,
         assigned_faculties: data.assigned_faculties.map((w) => w.id),
         employment_start_date: data.employment_start_date,
      };
      return transformData;
   } catch (error) {
      console.log(error);
      
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return {
         error: "Error interno del servidor",
      };
   }
};
