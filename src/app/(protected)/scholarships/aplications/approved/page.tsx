"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { getAplications } from "@/actions/aplications/getAll";
import StudentProcesses from "@/components/student_process/student_process";
import { StudentProcess } from "@/types/student-process";
import { useSearchParams } from "next/navigation";
import ApprovedStudentsTable from "@/components/table_approved/table_approved";

const ApprovedPage = () => {
   const searchParams = useSearchParams();
   const idParam = searchParams.get("id");

   const { data: session, status } = useSession();

   const [studentProcesses, setStudentProcesses] = useState<StudentProcess[]>(
      []
   );
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
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

      fetchApplications();
   }, [idParam, session?.user?.id]);

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
         <ApprovedStudentsTable students={studentProcesses} />
      </div>
   );
};

export default ApprovedPage;
