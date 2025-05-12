import { string, z } from "zod";

export const logInSchema = z.object({
   username: string({ required_error: "Username is required" }).email(
      "Email is invalid"
   ),
   password: string({ required_error: "Password is requerid" })
      .min(6, "Minimun character is 6")
      .max(32, "Name must be less than 32 characters"),
});
