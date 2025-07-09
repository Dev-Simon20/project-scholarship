'use server'
import {
   ScholarshipProcess,
   ScholarshipProcessWithoutCounts,
} from "@/types/scholarship-process";
import { Requirement, RequirementWithoutId } from "@/types/requiremet";
import { prismaDb } from "@/lib/db";
import { auth } from "@nextAuth/auth";

export async function crearteScholarShip(
   scholarshipProcess: ScholarshipProcessWithoutCounts,
   requirements: RequirementWithoutId[]
) {
   try {
      const session = await auth();
      const user_id = session?.user.id;
      const role = session?.user.role;
      if (!user_id || role !== "admin") {
         throw new Error("Error de usuario");
      }
      const res=await prismaDb.$transaction(async (tx) => {
         const scholarship = await tx.scholarshipProcess.create({
            data: {
               created_by: user_id,
               title: scholarshipProcess.title,
               sub_title: scholarshipProcess.sub_title,
               comment: scholarshipProcess.comment,
               steps_count: scholarshipProcess.steps_count,
               open_date: scholarshipProcess.open_date,
               close_date: scholarshipProcess.close_date,
            },
         });
         for (const r of requirements) {
            await tx.requirement.create({
               data: {
                  process_id: scholarship.id,
                  title: r.title,
                  sub_title: r.sub_title,
                  step_number: r.step_number,
                  max_size_mb: r.max_zise_mb,
                  url_file_example: r.url_file_example,
                  document_type: r.document_type,
                  allowed_file_types: r.allowed_file_types,
               },
            });
         }
      });
      console.log(res);
      
      return {
         success: true,
         message: "Proceso de beca creado satisfactoriamente",
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
