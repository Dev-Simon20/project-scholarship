"use client"

import { createSocialWorker } from "@/actions/social-workers/create";
import FormCreateSocialWorker from "@/components/form-create-social-worker/form-create-social-worker";
import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { SocialWorkerFormData } from "@/types/social-worker";
import { useRouter } from "next/navigation";

const CreateSocialWorkerpage = () => {
    const router = useRouter()

  const handleSubmit = async (data: SocialWorkerFormData) => {
    try {
      console.log("Creando trabajador social:", data)

      // Aquí implementarías la lógica para crear el trabajador social
      const payload = {
        user: {
          names: data.names,
          first_lastname: data.first_lastname,
          second_lastname: data.second_lastname,
          phone_number: data.phone_number,
          dni: data.dni,
          email: data.email,
          password: data.password,
          role: "social_worker",
        },
        socialWorker: {
          social_worker_status: data.social_worker_status,
          employment_start_date: data.employment_start_date,
          assigned_faculties: data.assigned_faculties,
        },
      }

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const res=await createSocialWorker(data) 
      alert("Trabajador social creado exitosamente")
      // router.push("/social-workers")
    } catch (error) {
      console.error("Error al crear trabajador social:", error)
      alert("Error al crear el trabajador social")
      throw error
    }
  }

  const handleCancel = () => {
    router.push("/social-workers")
  }
   return (
      <div className="container mx-auto py-8 max-w-4xl">
         <FormCreateSocialWorker mode="create" onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
   );
};
export default CreateSocialWorkerpage;
