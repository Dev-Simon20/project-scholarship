import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FacultySchema } from "@/schemas/faculty.schema";
import { toast } from "sonner";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, School2 } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { createFaculty } from "@/actions/faculties/create";

const FormModalFaculty = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof FacultySchema>>({
      resolver: zodResolver(FacultySchema),
   });
   const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
         form.reset();
         setIsOpen(false);
      }
   };

   const onSubmit = async (data: z.infer<typeof FacultySchema>) => {
      //    const response= await createFaculty(data)

      startTransition(async () => {
         try {
            const response = await createFaculty(data);
            if (response.error) {
               throw new Error(response.error);
            }
            toast.success("Creación exitosa", {
               description: "La facultad fue creada exitosamente",
            });
         } catch (error) {
            if (error instanceof Error) {
               toast.error(error.message);
            }
         }
      });
   };

   const handleClose = () => {
      form.reset();
      setIsOpen(false);
   };

   return (
      <div className="">
         <Button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
         >
            Nueva Facultad
         </Button>

         {isOpen && (
            <div
               onClick={handleBackgroundClick}
               className="fixed inset-0 z-40 flex items-center justify-center bg-neutral-400/40 bg-opacity-50"
            >
               <div className="bg-white dark:bg-neutral-950 rounded-xl shadow-lg max-w-md w-full p-6 relative">
                  <button
                     onClick={handleClose}
                     className="absolute top-2 right-2 text-gray-600 hover:text-black"
                  >
                     ✕
                  </button>
                  <main className="w-full ">
                     <div className="mb-4">
                        <h1 className="text-2xl">Cree una nueva facultad</h1>
                        <p className="text-xs">
                           Ingrese los datos correctamente para crear una
                           facultad
                        </p>
                     </div>
                     <div className="grid gap-4">
                        <Form {...form}>
                           <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-8"
                           >
                              <FormField
                                 control={form.control}
                                 name="name"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>
                                          Nombre de la facultad
                                       </FormLabel>
                                       <div className="relative">
                                          <div className="absolute inset-y-0  flex items-center pl-3 ">
                                             <School2 className="h-4 w-4" />
                                          </div>
                                          <Input
                                             placeholder="Ingrese el nombre de la nueva facultad"
                                             {...field}
                                             className="pl-9 h-10 text-sm"

                                             //  disabled={isPending}
                                          />
                                       </div>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="creation_date"
                                 render={({ field }) => (
                                    <FormItem className="flex flex-col ">
                                       <FormLabel>Fecha de creación</FormLabel>
                                       <Popover>
                                          <PopoverTrigger asChild>
                                             <FormControl>
                                                <Button
                                                   variant={"outline"}
                                                   className={cn(
                                                      " pl-3 text-left font-normal",
                                                      !field.value &&
                                                         "text-muted-foreground"
                                                   )}
                                                >
                                                   {field.value ? (
                                                      format(field.value, "PPP")
                                                   ) : (
                                                      <span>
                                                         Ingrese la fecha de
                                                         creación
                                                      </span>
                                                   )}
                                                   <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                             </FormControl>
                                          </PopoverTrigger>
                                          <PopoverContent
                                             className="w-auto p-0"
                                             align="start"
                                          >
                                             <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                   date > new Date() ||
                                                   date < new Date("1900-01-01")
                                                }
                                                captionLayout="dropdown"
                                             />
                                          </PopoverContent>
                                       </Popover>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <Button type="submit">Crear</Button>
                           </form>
                        </Form>
                     </div>
                  </main>
               </div>
            </div>
         )}
      </div>
   );
};

export default FormModalFaculty;
