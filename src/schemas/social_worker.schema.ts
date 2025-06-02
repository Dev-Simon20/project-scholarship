import { validatePasswordSchema } from "@/lib/signin_validate_schema";
import { string, z } from "zod";

export const socialWorkerSchema = z
   .object({
      names: string({ required_error: "El nombre es requerido" }).min(
         3,
         "El nombre debe de teber minimo 3 caracteres"
      ),
      first_lastname: string({
         required_error: "Apellido paterno requerido",
      }).min(3, "El minimo de caracteres son 3"),
      second_lastname: string({
         required_error: "Apellido materno requerido",
      }).min(3, "El minimo de carracteres son 3"),
      phone_numer: string({
         required_error: "El numero de celular es requerido",
      }).length(9, "Solo se admiten 9 caracteres"),
      email: string().refine((val) => val.endsWith("@unac.edu.pe"), {
         message: "El correo debe de termianr con @unac.edu.pe",
      }),
      password: validatePasswordSchema,
      passwordConfirmed: string(),
   })
   .refine((data) => data.password === data.passwordConfirmed, {
      path: ["passwordConfirmed"],
      message: "Las contraseñas no coinciden",
   });
