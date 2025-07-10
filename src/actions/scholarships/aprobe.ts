"use server";

import { prismaDb } from "@/lib/db";
import { auth } from "@nextAuth/auth";
import { SocialWorkerReviewStatus, StudentUploadStatus } from "@prisma/client";

export async function aprobeScholarShip(student_process_id: number) {
   try {
      const session = await auth();
      const user_id = session?.user.id;
      const role = session?.user.role;
      if (!user_id || role !== "social_worker") {
         throw new Error("Error de usuario");
      }
      await prismaDb.studentProcess.update({
         data: {
            social_worker_review_status: SocialWorkerReviewStatus.approved,
         },
         where: {
            id: student_process_id,
         },
      });

      return {
         success: true,
         message: `Beca aprobada satisfactoriamente`,
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
