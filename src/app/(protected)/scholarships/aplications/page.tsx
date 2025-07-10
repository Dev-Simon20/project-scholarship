"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { getAplications } from "@/actions/aplications/getAll";
import StudentProcesses from "@/components/student_process/student_process";
import { StudentProcess } from "@/types/student-process";
import { useSearchParams } from "next/navigation";
import { takeStudentProcess } from "@/actions/scholarships/take";

const AplicationsPage = () => {
   const searchParams = useSearchParams();
   const idParam = searchParams.get("id");

   const { data: session, status } = useSession();

   const [studentProcesses, setStudentProcesses] = useState<StudentProcess[]>(
      []
   );
   const [isLoading, setIsLoading] = useState(true);

   const fetchApplications = async () => {
      // Asegurarse de que el ID y la sesión estén disponibles antes de hacer la llamada
      if (!idParam || !session?.user?.id) return;

      try {
         setIsLoading(true);
         const res = await getAplications(Number(idParam));

         if ("error" in res) {
            toast.error(res.error);
         } else {
            setStudentProcesses(res);
         }
      } catch (error) {
         toast.error("Ocurrió un error al cargar las aplicaciones.");
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchApplications();
   }, [idParam, session?.user?.id]);

   const handleReview = (processId: number) => {
      console.log(`Revisando proceso ${processId}`);
      // Aquí implementarías la lógica para revisar el proceso
   };

   const handleTake = async (processId: number) => {
      console.log(`Tomando proceso ${processId}`);
      const res = await takeStudentProcess(processId);
      if ("error" in res) {
         toast.error("No se pudo tomar la tarea");
      } else {
         await fetchApplications();
         toast.success("Se tomo el proceso satisfactoriamnte");
      }
   };

   if (status === "loading" || isLoading) {
      return <div className="p-8 text-center text-gray-600">Cargando...</div>;
   }

   if (!session?.user?.id) {
      return (
         <div className="p-8 text-center text-red-600">Sesión no válida</div>
      );
   }

   return (
      <div className="container mx-auto py-8">
         <StudentProcesses
            studentProcesses={studentProcesses}
            currentSocialWorkerId={session.user.id}
            onReview={handleReview}
            onTake={handleTake}
         />
      </div>
   );
};

export default AplicationsPage;
