"use server";

import { prismaDb } from "@/lib/db";
import { auth } from "@nextAuth/auth";
import { SocialWorkerReviewStatus, StudentUploadStatus } from "@prisma/client";

export async function isncriptionScholarShip(process_id: number) {
   try {
      const session = await auth();
      const user_id = session?.user.id;
      const role = session?.user.role;
      if (!user_id || role !== "student") {
         throw new Error("Error de usuario");
      }
      await prismaDb.studentProcess.create({
         data: {
            student_id: user_id,
            sccholarship_process_id: process_id,
            student_upload_status: StudentUploadStatus.in_progress,
            social_worker_review_status: SocialWorkerReviewStatus.pending,
         },
      });
      const proceso = await prismaDb.scholarshipProcess.findFirst({
         where: {
            id: process_id,
         },
      });

      return {
         success: true,
         message: `Inscrito satisfactoriamente ala beca ${proceso?.title}`,
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
