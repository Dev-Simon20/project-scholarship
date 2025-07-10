"use client";
import { useForm } from "react-hook-form";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "../ui/card";
import { z } from "zod";
import { signInValidateSchema } from "@/lib/signin_validate_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, Mail } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Headerform from "../header_form/header_form";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import { registerAuth } from "@/actions/auth/register";
import { toast } from "sonner";
import { School } from "@/types/school";
import { getAllSchools } from "@/actions/faculties/schools/getAll";

const FormSignin = () => {
   const [isPending, startTransition] = useTransition();
   const form = useForm<z.infer<typeof signInValidateSchema>>({
      resolver: zodResolver(signInValidateSchema),
      defaultValues: {
         names: "",
         second_lastname: "",
         first_lastname: "",
         code_university: "",
         email: "",
         password: "",
         phone_number: "",
         passwordConfirmed: "",
      },
   });

   const [schools, setSchools] = useState<School[]>([]);

   const fetchSchools = async () => {
      const res = await getAllSchools();
      console.log(res);

      if ("error" in res) {
         console.error("Error las fcuatades", res.error);
      } else {
         setSchools(res);
      }
   };

   const onSubmit = (values: z.infer<typeof signInValidateSchema>) => {
      console.log(values);
      startTransition(async () => {
         try {
            const register = await registerAuth(values);
            if (register.error) {
               throw new Error(register.error);
            }
            toast.success("Registro exitoso", {
               description: "El usuario fue registrado exitosamente",
               action: {
                  label: "Log In",
                  onClick: () => console.log("Undo"),
               },
            });
         } catch (error) {
            if (error instanceof Error) {
               toast.error(error.message);
            }
         }
      });
   };

   useEffect(() => {
      fetchSchools();
   }, []);
   return (
      <Card className="w-[650px] pt-0 overflow-hidden text-neutral-700 dark:text-white border-0 outline-0">
         <Headerform
            title="Sign  In"
            description="Create your account to continue"
         />
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 flex flex-col items-center"
               >
                  <section className="flex gap-4 w-full ">
                     <FormField
                        control={form.control}
                        name="names"
                        render={({ field }) => (
                           <FormItem className=" flex-1">
                              <FormLabel>Name</FormLabel>
                              <Input
                                 placeholder="Enter your name"
                                 {...field}
                                 className=" h-11"
                              />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="first_lastname"
                        render={({ field }) => (
                           <FormItem className=" flex-1">
                              <FormLabel>First Lastname</FormLabel>
                              <Input
                                 placeholder="Enter your first last name"
                                 {...field}
                                 className=" h-11"
                              />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </section>
                  <section className="flex gap-4 w-full ">
                     <FormField
                        control={form.control}
                        name="second_lastname"
                        render={({ field }) => (
                           <FormItem className=" flex-1">
                              <FormLabel>Second lastname</FormLabel>
                              <Input
                                 placeholder="Enter your second last name"
                                 {...field}
                                 className=" h-11"
                              />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                           <FormItem className=" flex-1">
                              <FormLabel>Phone number</FormLabel>
                              <Input
                                 placeholder="Enter your phone number"
                                 {...field}
                                 className=" h-11"
                              />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </section>

                  <section className="flex gap-4 w-full">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem className="flex-1">
                              <FormLabel>Email</FormLabel>
                              <div className="relative">
                                 <div className="absolute inset-y-0  flex items-center pl-3 ">
                                    <Mail className="h-4 w-4" />
                                 </div>
                                 <Input
                                    placeholder="example@unac.edu.pe"
                                    {...field}
                                    className="pl-9 h-11"
                                 />
                              </div>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="code_university"
                        render={({ field }) => (
                           <FormItem className=" flex-1">
                              <FormLabel>Code university</FormLabel>
                              <Input
                                 placeholder="Enter your code university"
                                 {...field}
                                 className=" h-11"
                              />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </section>
                  <section className="flex gap-4 w-full ">
                     <FormField
                        control={form.control}
                        name="school_id"
                        render={({ field }) => (
                           <FormItem className="flex-1">
                              <FormLabel>Escuela Profesional</FormLabel>
                              <select
                                 value={field.value}
                                 onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                 }
                                 className="h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              >
                                 <option value="">
                                    Seleccione una escuela
                                 </option>
                                 {schools.map((s) => (
                                    <option value={`${s.id}`}>{s.name}</option>
                                 ))}
                              </select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </section>
                  <section className="flex gap-4 w-full ">
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem className=" flex-1">
                              <FormLabel>Password</FormLabel>
                              <Input
                                 placeholder="Enter a  password"
                                 {...field}
                                 className=" h-11"
                              />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="passwordConfirmed"
                        render={({ field }) => (
                           <FormItem className=" flex-1">
                              <FormLabel>Confirmed your password</FormLabel>
                              <Input
                                 placeholder="Re-enter the password"
                                 {...field}
                                 className=" h-11"
                              />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </section>

                  <Button type="submit" className="self-end">
                     Submit
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};
export default FormSignin;
