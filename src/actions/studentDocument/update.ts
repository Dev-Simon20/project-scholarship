"use server";

import { prismaDb } from "@/lib/db";
import { auth } from "@nextAuth/auth";
import {
   ReviewStatus,
   SocialWorkerReviewStatus,
   StudentUploadStatus,
} from "@prisma/client";

export async function updateStatuStudentDocument(
   id: number,
   review_status: ReviewStatus
) {
   try {
      const session = await auth();
      const user_id = session?.user.id;
      const role = session?.user.role;
      if (!user_id || role !== "social_worker") {
         throw new Error("Error de usuario");
      }
       await prismaDb.studentDocument.update({
         data: {
            review_status: review_status,
         },
         where: {
            id: id,
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
