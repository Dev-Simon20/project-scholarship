import { validatePasswordSchema } from "@/lib/signin_validate_schema";
import { SocialWorkerStatus } from "@prisma/client";
import { string, z } from "zod";

export const createSocialWorkerSchema = (isEditMode = false) =>
   z.object({
      names: z.string().min(2, "Los nombres deben tener al menos 2 caracteres"),
      first_lastname: z
         .string()
         .min(2, "El primer apellido debe tener al menos 2 caracteres"),
      second_lastname: z
         .string()
         .min(2, "El segundo apellido debe tener al menos 2 caracteres"),
      phone_number: z
         .string()
         .min(9, "El número de teléfono debe tener al menos 9 dígitos"),
      dni: z
         .string()
         .length(8, "El DNI debe tener exactamente 8 dígitos")
         .regex(/^\d+$/, "El DNI solo debe contener números"),
      email: z.string().email("Ingrese un email válido"),
      password: isEditMode
         ? z.string().optional()
         : z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
      social_worker_status: z.nativeEnum(SocialWorkerStatus, {
         errorMap: () => ({ message: "Seleccione un estado válido" }),
      }),
      assigned_faculties: z
         .array(z.number())
         .min(1, "Debe asignar al menos una facultad"),
      employment_start_date: z.date({
         required_error: "La fecha de inicio de empleo es requerida",
      }),
   });
