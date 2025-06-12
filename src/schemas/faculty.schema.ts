import { date, string, z } from "zod";

export const FacultySchema = z.object({
   name: string({ required_error: "El nombre es requerido" }),
   creation_date: date({
      required_error: "La fecha de creación es requerida",
   })
      .min(new Date("1900-01-01"), { message: "La fecha es muy antigua " })
      .max(new Date(), { message: "La fecha sobrepasa la fecha actual" }),
});
