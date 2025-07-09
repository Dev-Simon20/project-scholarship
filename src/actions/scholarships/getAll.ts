"use server";
import { prismaDb } from "@/lib/db";
import { ScholarshipProcess } from "@/types/scholarship-process";
import { auth } from "@nextAuth/auth";
import { AuthError } from "next-auth";
// export interface ScholarshipProcess {
//   id: number
//   created_by: string
//   title: string
//   sub_title: string
//   comment: string
//   steps_count: number
//   open_date: string | Date
//   close_date: string | Date
//   requirements: number
//   student_processes: number
// }
export const getAllScholarships = async () => {
   try {
      const session = await auth();
      const user_id = session?.user.id;
      if (!user_id) {
         throw new Error("El usario no existe");
      }

      const res = await prismaDb.scholarshipProcess.findMany({
         include: {
            requirements: true,
            student_processes: true,
         },
      });

      const scholarships: ScholarshipProcess[] = res.map((s) => ({
         id: s.id,
         created_by: s.created_by,
         title: s.title,
         sub_title: s.sub_title,
         comment: s.comment,
         steps_count: s.steps_count,
         open_date: s.open_date,
         close_date: s.close_date,
         requirements: s.requirements.length,
         student_processes: s.student_processes.length,
      }));

      return scholarships;
   } catch (error) {
      console.log("el errors es: ", error);

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
