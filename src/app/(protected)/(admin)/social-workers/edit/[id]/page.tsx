"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import type { SocialWorkerFormData } from "@/types/social-worker";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import FormCreateSocialWorker from "@/components/form-create-social-worker/form-create-social-worker";
import { getSocialWorkerById } from "@/actions/social-workers/get";
import { editSocialWorker } from "@/actions/social-workers/update";

export default function EditSocialWorkerPage() {
   const router = useRouter();
   const params = useParams();
   const socialWorkerId = params.id as string;

   const [socialWorker, setSocialWorker] =
      useState<SocialWorkerFormData | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const loadSocialWorker = async () => {
         try {
            setLoading(true);
            const data = await getSocialWorkerById(socialWorkerId);

            if ("error" in data) {
               setError("Trabajador social no encontrado");
               return;
            }
            setSocialWorker(data);
         } catch (err) {
            console.error("Error loading social worker:", err);
            setError("Error al cargar los datos del trabajador social");
         } finally {
            setLoading(false);
         }
      };

      if (socialWorkerId) {
         loadSocialWorker();
      }
   }, [socialWorkerId]);

   const handleSubmit = async (data: SocialWorkerFormData) => {

      try {
         console.log("Actualizando trabajador social:", {
            id: socialWorkerId,
            ...data,
         });

         // Aquí implementarías la lógica para actualizar el trabajador social
         const payload = {
            id: socialWorkerId,
            user: {
               names: data.names,
               first_lastname: data.first_lastname,
               second_lastname: data.second_lastname,
               phone_number: data.phone_number,
               dni: data.dni,
               email: data.email,
               ...(data.password && { password: data.password }), // Solo incluir si se proporciona
            },
            socialWorker: {
               social_worker_status: data.social_worker_status,
               employment_start_date: data.employment_start_date,
               assigned_faculties: data.assigned_faculties,
            },
         };

         // Simular llamada a API
         const res= await editSocialWorker(data,socialWorkerId);
         console.log('respuesta del backend',res);
         

         alert("Trabajador social actualizado exitosamente");
         router.push("/social-workers");
      } catch (error) {
         console.error("Error al actualizar trabajador social:", error);
         alert("Error al actualizar el trabajador social");
         throw error;
      }
   };

   const handleCancel = () => {
      router.push("/social-workers");
   };

   if (loading) {
      return (
         <div className="container mx-auto py-8 max-w-4xl">
            <Card>
               <CardContent className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <span className="ml-2">
                     Cargando datos del trabajador social...
                  </span>
               </CardContent>
            </Card>
         </div>
      );
   }

   if (error || !socialWorker) {
      return (
         <div className="container mx-auto py-8 max-w-4xl">
            <Card>
               <CardContent className="flex items-center justify-center py-8">
                  <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
                  <span>{error || "Trabajador social no encontrado"}</span>
               </CardContent>
            </Card>
         </div>
      );
   }


   return (
      <div className="container mx-auto py-8 max-w-4xl">
         <FormCreateSocialWorker
            mode="edit"
            initialData={socialWorker}
            socialWorkerId={socialWorkerId}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
         />
      </div>
   );
}
