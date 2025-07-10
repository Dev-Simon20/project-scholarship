"use server";

import { prismaDb } from "@/lib/db";
import { auth } from "@nextAuth/auth";
import {
   ReviewStatus,
   SocialWorkerReviewStatus,
   StudentUploadStatus,
} from "@prisma/client";

export async function createStudentDocument(
   process_id: number,
   requirement_id: number,
   file_url: string
) {
   try {
      const session = await auth();
      const user_id = session?.user.id;
      const role = session?.user.role;
      if (!user_id || role !== "student") {
         throw new Error("Error de usuario");
      }
      const studentProcess = await prismaDb.studentProcess.findFirst({
         where: {
            student_id: user_id,
            sccholarship_process_id: process_id,
         },
      });
      if (!studentProcess) {
         throw new Error(`El estudiante aun no esta inscrito`);
      }

      await prismaDb.studentDocument.create({
         data: {
            student_process_id: studentProcess.id,
            requirement_id: requirement_id,
            file_url: file_url,
            review_status: ReviewStatus.Pending,
         },
      });

      return {
         success: true,
         message: `Archivo subido correctamente`,
      };
   } catch (error) {
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return {
         error: "Error interno del servidor",
      };
   }
}
