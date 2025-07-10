"use server";

import { prismaDb } from "@/lib/db";
import { auth } from "@nextAuth/auth";

export async function takeStudentProcess(student_process_id: number) {
   try {
      const session = await auth();
      const user_id = session?.user.id;
      const role = session?.user.role;
      if (!user_id || role !== "social_worker") {
         throw new Error("Error de usuario");
      }
      await prismaDb.studentProcess.update({
         data: {
            social_worker_id: user_id,
         },
         where: {
            id: student_process_id,
         },
      });

      return {
         success: true,
         message: `Proceso tomado`,
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
