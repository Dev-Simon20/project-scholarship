"use server";

import { prismaDb } from "@/lib/db";
import {
   type Requirement,
   ScholarshipProcess,
   UserDocument,
} from "@/types/scholarship-student";
import { dataForApllication } from "@/types/student-process";

export async function getScholarShipProcess(
   process_id: number,
   user_id: string
) {
   try {
      const result = await prismaDb.scholarshipProcess.findFirst({
         where: {
            id: process_id,
         },
      });

      if (!result) {
         throw new Error(
            `No se encontró un proceso de beca con id ${process_id}`
         );
      }
      const scholarshipProcess: ScholarshipProcess = {
         ...result,
         subtitle: result.sub_title, // adaptamos el nombre
      };

      const resultRequire = await prismaDb.requirement.findMany({
         where: {
            process_id: process_id,
         },
      });
      if (resultRequire.length === 0) {
         throw new Error(
            `No se encontraron requerimientos para proceso de beca con id ${process_id}`
         );
      }
      const requirements: Requirement[] = resultRequire;
      const studentProcess = await prismaDb.studentProcess.findFirst({
         where: {
            student_id: user_id,
            sccholarship_process_id: process_id,
         },
         include: {
            student: {
               include: {
                  school: true,
                  user: true,
               },
            },
         },
      });
      if (!studentProcess) {
         throw new Error(`El estudiante aun no esta inscrito`);
      }
      const transform: dataForApllication = {
         names: studentProcess.student.user.names,
         first_lastname: studentProcess.student.user.first_lastname,
         second_lastname: studentProcess.student.user.second_lastname,
         dni: studentProcess.student.user.dni || " ",
         code_university: studentProcess.student.code_university,
         school_name: studentProcess.student.school.name,
         student_process_id: studentProcess.id,
         social_worker_review_status:studentProcess.social_worker_review_status
      };
      const studentDocuments: UserDocument[] =
         await prismaDb.studentDocument.findMany({
            where: {
               student_process_id: studentProcess.id,
            },
         });
      console.log(studentDocuments);

      return {
         scholarshipProcess,
         requirements,
         studentDocuments,
         transform
      };
   } catch (error) {
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return {
         error: "Error desconocido",
      };
   }
}
