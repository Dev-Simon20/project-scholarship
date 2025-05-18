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
import { logInAuth } from "@/actions/auth/logIn";
import Headerform from "../header_form/header_form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormLogin = () => {
   const [hiddenPassword, setHiddenPassword] = useState(true);
   const router=useRouter();
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
         const response = await logInAuth(values);
         if (response.error) {
             toast.error(response.error)
         } else {
            toast.success("El login fue exitoso")
         }
      });
   }

   return (
      <Card className="w-[350px] pt-0 overflow-hidden text-neutral-700 dark:text-white border-0 outline-0">
         <Headerform
            title="Log In"
            description="Log in to your account to continue"
         />
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
                                 placeholder="example@unac.edu.pe"
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
