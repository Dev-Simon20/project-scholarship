import { object, string, z } from "zod";

export const validatePasswordSchema = z
   .string()
   .min(8, { message: "Debe tener al menos 8 caracteres." })
   .max(20, { message: "No debe exceder los 20 caracteres." })
   .refine((val) => /[A-Z]/.test(val), {
      message: "Debe contener al menos una letra mayúscula.",
   })
   .refine((val) => /[a-z]/.test(val), {
      message: "Debe contener al menos una letra minúscula.",
   })
   .refine((val) => /[0-9]/.test(val), {
      message: "Debe contener al menos un número.",
   })
   .refine((val) => /[!@#$%^&*]/.test(val), {
      message: "Debe contener al menos un carácter especial (!@#$%^&*).",
   });

export const signInValidateSchema = object({
   names: string({ required_error: "Names is required" })
      .min(3, "Minimun characters is 3")
      .max(15, "Maximun characters is 15"),
   first_lastname: string({ required_error: "First Lastname is required " })
      .min(3, "Minimun characters is 3")
      .max(15, "Maximun characters is 15"),
   second_lastname: string({ required_error: "Second Lastname is required " })
      .min(3, "Minimun characters is 3")
      .max(15, "Maximun characters is 15"),
   code_university: string({
      required_error: "Code university is required ",
   }).length(10, "The code has 10 characters"),
   phone_number: string({ required_error: "Phone number is required" }).length(
      9,
      "The number must have 9 characters"
   ),
   email: string().refine((value) => value.endsWith("@unac.edu.pe"), {
      message: "The email must belong to the @unac.edu.pe domain",
   }),
   password: validatePasswordSchema,
   passwordConfirmed: string(),
}).refine((data) => data.password === data.passwordConfirmed, {
   path: ["passwordConfirmed"],
   message: "Las contraseñas no coinciden",
});
