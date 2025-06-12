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

export async function createSocialWorker(data: SocialWorkerFormData) {
   try {
      // Validar datos
      console.log('se entro ala funcin');
      
      const validatedData = createSocialWorkerSchema.parse(data);

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

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

      // Crear usuario y trabajador social en una transacción
      const result = await prismaDb.$transaction(async (tx) => {
         // Crear usuario
         const user = await tx.user.create({
            data: {
               names: validatedData.names,
               first_lastname: validatedData.first_lastname,
               second_lastname: validatedData.second_lastname,
               phone_number: validatedData.phone_number,
               dni: validatedData.dni,
               email: validatedData.email,
               password: hashedPassword,
               role: "social_worker",
            },
         });

         // Crear trabajador social
         const socialWorker = await tx.socialWorker.create({
            data: {
               user_id: user.id,
               social_worker_status: validatedData.social_worker_status,
               employment_start_date: validatedData.employment_start_date,
               assigned_faculties: {
                  connect: validatedData.assigned_faculties.map((id) => ({
                     id,
                  })),
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
         message: "Trabajador social creado exitosamente",
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
