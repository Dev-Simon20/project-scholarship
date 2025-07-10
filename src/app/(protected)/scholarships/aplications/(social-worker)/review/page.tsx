"use client";

import { getScholarShipProcess } from "@/actions/scholarships/get";
import { createStudentDocument } from "@/actions/studentDocument/create";
import ScholarshipDocumentUpload from "@/components/scholarship-document-upload.tsx/scholarship-document-upload";
import {
   type ScholarshipProcess,
   type Requirement,
   type UserDocument,
} from "@/types/scholarship-student";
import { dataForApllication } from "@/types/student-process";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ReviewPage() {
   const searchParams = useSearchParams();
   const id = searchParams.get("id");
   const studentIdParam = searchParams.get("student_id"); // 👈 nuevo parámetro
   const { data: session, status } = useSession();

   const [scholarshipProcess, setScholarshipProcess] =
      useState<ScholarshipProcess | null>(null);
   const [requirements, setRequirements] = useState<Requirement[] | null>([]);
   const [userDocuments, setUserDocuments] = useState<UserDocument[] | null>(
      null
   );
   const [isLoading, setIsLoading] = useState(true);
   const [studentData, setStudentData] = useState<dataForApllication | null>(
      null
   );

   const [error, setError] = useState<string | null>(null);

   const getData = async () => {
      if (!id || !studentIdParam) {
         const msg = "Faltan parámetros requeridos.";
         setError(msg);
         toast.error(msg);
         setIsLoading(false);
         return;
      }

      setIsLoading(true);
      const response = await getScholarShipProcess(Number(id), studentIdParam);

      if ("error" in response) {
         setError(response?.error || "Erroe inseprado");
         toast.error(`Error: ${response.error}`);
      } else {
         if (!response.requirements || response.requirements.length === 0) {
            const msg = "El proceso de beca no tiene requerimientos definidos.";
            setError(msg);
            toast.error(msg);
         } else {
            console.log(response.studentDocuments);

            setScholarshipProcess(response.scholarshipProcess);
            setRequirements(response.requirements);
            setUserDocuments(response.studentDocuments);
            setStudentData(response.transform);
         }
      }

      setIsLoading(false);
   };
   const handleDocumentUpload = async (
      requirementId: number,
      fileUrl: string
   ) => {
      if (id) {
         await createStudentDocument(Number(id), requirementId, fileUrl);
         getData();
      } else {
         toast.error("Las credenciles del proceso de beca son incrrectas");
      }
   };

   useEffect(() => {
      if (status === "authenticated") {
         getData();
      }
   }, [status]);

   if (isLoading) {
      return <div className="p-8 text-center text-gray-600">Cargando...</div>;
   }

   if (error) {
      return (
         <div className="p-8 text-center text-red-600">
            <p>Ocurrió un error:</p>
            <p className="font-medium">{error}</p>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-50 p-4 w-full">
         {userDocuments &&
            requirements &&
            scholarshipProcess &&
            session?.user?.role &&
            studentData && (
               <ScholarshipDocumentUpload
                  scholarshipProcess={scholarshipProcess}
                  requirements={requirements}
                  userDocuments={userDocuments}
                  onDocumentUpload={handleDocumentUpload}
                  userRole={session?.user?.role}
                  getData={getData}
                  studentData={studentData}
               />
            )}
      </div>
   );
}
