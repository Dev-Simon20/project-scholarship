"use client";

import { logInSchema } from "@/lib/login_validate_schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "../ui/card";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../ui/form";
import { Eye, EyeClosed, GraduationCap, Mail, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { logInAction } from "@/actions/auth-actions";

const saludarConRetraso = (): Promise<string> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve("Hola mundo");
      }, 3000); // 3000 milisegundos = 3 segundos
   });
};

const FormLogin = () => {
   const [hiddenPassword, setHiddenPassword] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const form = useForm<z.infer<typeof logInSchema>>({
      resolver: zodResolver(logInSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const [isPending, startTransition] = useTransition();

   function onSubmit(values: z.infer<typeof logInSchema>) {
       startTransition(async () => {
         let errorTemp: string | null = null;
         const response = await logInAction(values);
         if (response.error) {
            errorTemp = response.error;
         } else {
         }
         setError(errorTemp);
      });
   }

   return (
      <Card className="w-[350px] pt-0 overflow-hidden text-neutral-700 dark:text-white border-0 outline-0">
         <CardHeader className="bg-blue-600 px-5 py-6 flex items-center !text-white">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
               <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
               <CardTitle className="text-xl">Log In</CardTitle>
               <CardDescription className="text-sm text-white">
                  Log in to your account to continue
               </CardDescription>
            </div>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
               >
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <div className="relative">
                              <div className="absolute inset-y-0  flex items-center pl-3 ">
                                 <Mail className="h-4 w-4" />
                              </div>
                              <Input
                                 placeholder="example@correo.com"
                                 {...field}
                                 className="pl-9 h-11"
                                 disabled={isPending}
                              />
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl className="relative">
                              <div className="relative">
                                 <div
                                    className="absolute inset-y-0  flex items-center pl-3 "
                                    onClick={() =>
                                       setHiddenPassword(!hiddenPassword)
                                    }
                                 >
                                    {hiddenPassword ? (
                                       <Eye className="h-4 w-4" />
                                    ) : (
                                       <EyeClosed className="h-4 w-4" />
                                    )}
                                 </div>
                                 <Input
                                    placeholder="Password"
                                    {...field}
                                    className="pl-9 h-11"
                                    type={hiddenPassword ? "password" : "text"}
                                    disabled={isPending}
                                 />
                              </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit" disabled={isPending}>
                     Submit
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};
export default FormLogin;
