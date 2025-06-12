"use server";

import { prismaDb } from "@/lib/db";
import { SocialWorkerFormData } from "@/types/social-worker";
import { SocialWorkerStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
const createSocialWorkerSchema = z.object({
   names: z.string().min(2),
   first_lastname: z.string().min(2),
   second_lastname: z.string().min(2),
   phone_number: z.string().min(9),
   dni: z.string().length(8),
   email: z.string().email(),
   password: z.string().min(8),
   social_worker_status: z.nativeEnum(SocialWorkerStatus),
   assigned_faculties: z.array(z.number()).min(1),
   employment_start_date: z.date(),
});

export async function editSocialWorker(data: SocialWorkerFormData, id: string) {
   try {
      // Validar datos
      console.log("se entro ala funcin");

      const validatedData = createSocialWorkerSchema.parse(data);

      console.log("facutades enviadas", validatedData.assigned_faculties);

      // Verificar que las facultades existen
      const facultiesExist = await prismaDb.faculty.findMany({
         where: {
            id: {
               in: validatedData.assigned_faculties,
            },
         },
         select: {
            id: true,
         },
      });

      if (facultiesExist.length !== validatedData.assigned_faculties.length) {
         return {
            success: false,
            message: "Una o más facultades no existen",
         };
      }

      console.log("faucktades ecitentes de verificcion", facultiesExist);
      // Crear usuario y trabajador social en una transacción
      const result = await prismaDb.$transaction(async (tx) => {
         // Crear usuario
         const user = await tx.user.update({
            where: {
               id: id,
            },
            data: {
               names: validatedData.names,
               first_lastname: validatedData.first_lastname,
               second_lastname: validatedData.second_lastname,
               phone_number: validatedData.phone_number,
               dni: validatedData.dni,
               email: validatedData.email,
               role: "social_worker",
            },
         });

         // Crear trabajador social
         const socialWorker = await tx.socialWorker.update({
            where: {
               user_id: user.id,
            },
            data: {
               social_worker_status: validatedData.social_worker_status,
               employment_start_date: validatedData.employment_start_date,
               assigned_faculties: {
                  set: validatedData.assigned_faculties.map((id) => ({ id })),
               },
            },
            include: {
               user: true,
               assigned_faculties: {
                  select: {
                     id: true,
                     name: true,
                  },
               },
            },
         });

         return socialWorker;
      });

      return {
         success: true,
         message: "Trabajador social Actualizado correctamnete",
         data: {
            ...result,
            assigned_faculties_ids: result.assigned_faculties.map((f) => f.id),
         },
      };
   } catch (error) {
      if (error instanceof z.ZodError) {
         return {
            error: error.message,
         };
      }
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return {
         error: "Error interno del servidor",
      };
   }
}
