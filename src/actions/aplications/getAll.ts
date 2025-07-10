"use server";
import { prismaDb } from "@/lib/db";
import { ScholarshipProcess } from "@/types/scholarship-process";
import { StudentProcess } from "@/types/student-process";
import { auth } from "@nextAuth/auth";
import { SocialWorkerReviewStatus, StudentUploadStatus } from "@prisma/client";
import { AuthError } from "next-auth";

export const getAplications = async (process_id: number) => {
   try {
      const session = await auth();
      const user_id = session?.user.id;
      const role = session?.user.role;
      if (!user_id || role !== "social_worker") {
         throw new Error("Error de usuario");
      }

      const res = await prismaDb.studentProcess.findMany({
         where: {
            sccholarship_process_id: process_id,
         },
         include: {
            student: {
               include: {
                  user: true,
               },
            },
            social_worker: {
               include: {
                  user: true,
               },
            },
         },
      });
      const proceso = await prismaDb.scholarshipProcess.findFirst({
         where: {
            id: process_id,
         },
      });
      if (!proceso) {
         throw new Error("No exite el proceso");
      }
      const studentProcesses: StudentProcess[] = res.map((student) => ({
         id: student.id,
         student_id: student.student_id,
         social_worker_id: student.social_worker_id || null,
         sccholarship_process_id: student.sccholarship_process_id,
         student_upload_status: student.student_upload_status,
         names: student.student.user.names,
         first_lastname: student.student.user.first_lastname,
         second_lastname: student.student.user.second_lastname,
         dni: student.student.user.dni,
         social_worker_review_status: student.social_worker_review_status,
         name_process: proceso.title,
         social_worker_name:student.social_worker?.user.names||"Sin tomar"
      }));
      console.log(studentProcesses);

      return studentProcesses;
   } catch (error) {
      if (error instanceof AuthError) {
         return {
            error: error.cause?.err?.message,
         };
      }
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return {
         error: "Error desconocido",
      };
   }
};
