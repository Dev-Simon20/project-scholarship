"use server";
import { prismaDb } from "@/lib/db";
import { SocialWorkerEditData } from "@/types/social-worker";
import { auth } from "@nextAuth/auth";
import { AuthError } from "next-auth";

export const getAllSocialWorkers = async () => {
   try {
      const session = await auth();
      const user_id = session?.user.id;
      if (!user_id) {
         throw new Error("El usario no existe");
      }

      const socwork = await prismaDb.socialWorker.findMany({
         include: {
            user: true,
            assigned_faculties: true,
         },
      });

      const transformData: SocialWorkerEditData[] = socwork.map((social) => {
         const data: SocialWorkerEditData = {
            names: social.user.names,
            first_lastname: social.user.first_lastname,
            second_lastname: social.user.second_lastname,
            phone_number: social.user.phone_number,
            dni: social.user.dni || "-",
            email: social.user.email,
            social_worker_status: social.social_worker_status,
            id: social.user.id,
            employment_start_date: social.employment_start_date,
            assigned_faculties: social.assigned_faculties.map((w) => w.id),
            user_id: social.user_id,
         };
         return data;
      });

      return transformData;
   } catch (error) {
      console.log("el errors es: ", error);

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
