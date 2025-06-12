import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { SchoolSchema } from "@/schemas/school.schema";
import { createSchool } from "@/actions/faculties/schools/create";

interface PropsModalSchool {
   faculty_id: number;
   nameFaculty: string;
}

const FormModalSchool = ({ faculty_id, nameFaculty }: PropsModalSchool) => {
   const [isOpen, setIsOpen] = useState(false);
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof SchoolSchema>>({
      resolver: zodResolver(SchoolSchema),
      values: {
         name: "",
         faculty_id: faculty_id,
      },
   });
   const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
         form.reset();
         setIsOpen(false);
      }
   };

   const onSubmit = async (data: z.infer<typeof SchoolSchema>) => {
      startTransition(async () => {
         try {
            const response = await createSchool(data);
            if (response.error) {
               throw new Error(response.error);
            }
            toast.success("Creación exitosa", {
               description: "La Escuela fue creada exitosamente",
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
            size="sm"
            className="h-7 text-xs border-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-800"
         >
            Nueva Escuela
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
                        <h1 className="text-xl">
                           Cree una nueva Escuela en la{" "}
                           <span>
                              <b>{nameFaculty}</b>{" "}
                           </span>
                        </h1>
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
                                          Nombre de la Escuela
                                       </FormLabel>
                                       <div className="relative">
                                          <div className="absolute inset-y-0  flex items-center pl-3 ">
                                             <School2 className="h-4 w-4" />
                                          </div>
                                          <Input
                                             placeholder="Ingrese el nombre de la nueva facultad"
                                             {...field}
                                             className="pl-9 h-10 text-sm"
                                             disabled={isPending}
                                          />
                                       </div>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <Button type="submit">Crear Escuela</Button>
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

export default FormModalSchool;
