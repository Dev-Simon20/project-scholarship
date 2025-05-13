import { object, string} from "zod";

export const logInSchema = object({
   email: string({required_error:"Email is required"}).email("Email is invalid").refine((val)=>val.endsWith("@unac.edu.pe"),{message:"The email must belong to the @unac.edu.pe domain"}),
   password: string({ required_error: "Password is requerid" })
      .min(6, "Minimun character is 6")
      .max(32, "Name must be less than 32 characters"),
});
