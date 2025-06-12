"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus, User } from "lucide-react";
import { format } from "date-fns";
import {
   SocialWorkerEditData,
   SocialWorkerFormData,
} from "@/types/social-worker";
import { getAllSocialWorkers } from "@/actions/social-workers/getAll";

export default function SocialWorkersPage() {
   const [socialWorkers, setSocialWorkers] = useState<SocialWorkerEditData[]>(
      []
   );

   const fetchSocialWorkers = async () => {
      try {
         const res = await getAllSocialWorkers();
         if ("error" in res) {
            console.error(
               "Error las facultades no fueron entregadas",
               res.error
            );
         } else {
            setSocialWorkers(res);
         }
      } catch (error) {
         console.error("Error fetching faculties:", error);
      }
   };
   useEffect(() => {
    fetchSocialWorkers()
   }, []);

   return (
      <div className="container mx-auto py-8">
         <div className="flex justify-between items-center mb-6">
            <div>
               <h1 className="text-3xl font-bold">Trabajadores Sociales</h1>
               <p className="text-muted-foreground">
                  Gestiona los trabajadores sociales del sistema
               </p>
            </div>
            <Link href="/social-workers/create">
               <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Trabajador Social
               </Button>
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialWorkers.map((socialWorker) => (
               <Card
                  key={socialWorker.id}
                  className="hover:shadow-lg transition-shadow"
               >
                  <CardHeader>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <User className="h-5 w-5 text-muted-foreground" />
                           <CardTitle className="text-lg">
                              {socialWorker.names} {socialWorker.first_lastname}
                           </CardTitle>
                        </div>
                        <Badge
                           variant={
                              socialWorker.social_worker_status === "enabled"
                                 ? "default"
                                 : "secondary"
                           }
                        >
                           {socialWorker.social_worker_status === "enabled"
                              ? "Habilitado"
                              : "Deshabilitado"}
                        </Badge>
                     </div>
                     <CardDescription>{socialWorker.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-2 text-sm">
                        <div>
                           <span className="font-medium">DNI:</span>{" "}
                           {socialWorker.dni}
                        </div>
                        <div>
                           <span className="font-medium">Teléfono:</span>{" "}
                           {socialWorker.phone_number}
                        </div>
                        <div>
                           <span className="font-medium">
                              Inicio de empleo:
                           </span>{" "}
                           {format(
                              socialWorker.employment_start_date,
                              "dd/MM/yyyy"
                           )}
                        </div>
                        <div>
                           <span className="font-medium">
                              Facultades asignadas:
                           </span>{" "}
                           {socialWorker.assigned_faculties.length}
                        </div>
                     </div>

                     <div className="mt-4 flex justify-end">
                        <Link href={`/social-workers/edit/${socialWorker.id}`}>
                           <Button variant="outline" size="sm">
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                           </Button>
                        </Link>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
}
