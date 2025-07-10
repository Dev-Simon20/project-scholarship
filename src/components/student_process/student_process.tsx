"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, UserPlus } from "lucide-react";
import { StudentProcess } from "@/types/student-process";
import { SocialWorkerReviewStatus, StudentUploadStatus } from "@prisma/client";
import { useRouter } from "next/navigation";

interface StudentProcessesProps {
   studentProcesses: StudentProcess[];
   currentSocialWorkerId: string;
   onReview?: (processId: number) => void;
   onTake?: (processId: number) => void;
}

const getStatusBadgeVariant = (status: StudentUploadStatus) => {
   switch (status) {
      case StudentUploadStatus.pending:
         return "secondary";
      case StudentUploadStatus.in_progress:
         return "default";
      case StudentUploadStatus.completed:
         return "default";
      default:
         return "secondary";
   }
};

// Nueva función para el estado de revisión del trabajador social
const getReviewStatusBadgeVariant = (status: SocialWorkerReviewStatus) => {
   switch (status) {
      case SocialWorkerReviewStatus.pending:
         return "secondary";
      case SocialWorkerReviewStatus.in_review:
         return "default";
      case SocialWorkerReviewStatus.to_be_interviewed:
         return "outline";
      case SocialWorkerReviewStatus.interviewed:
         return "outline";
      case SocialWorkerReviewStatus.approved:
         return "default";
      case SocialWorkerReviewStatus.rejected:
         return "destructive";
      case SocialWorkerReviewStatus.changes_requested:
         return "secondary";
      default:
         return "secondary";
   }
};

const getStatusText = (status: StudentUploadStatus) => {
   switch (status) {
      case StudentUploadStatus.pending:
         return "Pendiente";
      case StudentUploadStatus.in_progress:
         return "En Progreso";
      case StudentUploadStatus.completed:
         return "Completado";
      default:
         return status;
   }
};

// Nueva función para el texto del estado de revisión
const getReviewStatusText = (status: SocialWorkerReviewStatus) => {
   switch (status) {
      case SocialWorkerReviewStatus.pending:
         return "Pendiente";
      case SocialWorkerReviewStatus.in_review:
         return "En Revisión";
      case SocialWorkerReviewStatus.to_be_interviewed:
         return "Por Entrevistar";
      case SocialWorkerReviewStatus.interviewed:
         return "Entrevistado";
      case SocialWorkerReviewStatus.approved:
         return "Aprobado";
      case SocialWorkerReviewStatus.rejected:
         return "Rechazado";
      case SocialWorkerReviewStatus.changes_requested:
         return "Cambios Solicitados";
      default:
         return status;
   }
};

export default function StudentProcesses({
   studentProcesses,
   currentSocialWorkerId,
   onReview,
   onTake,
}: StudentProcessesProps) {
   const router = useRouter();

   const renderActionButton = (process: StudentProcess) => {
      if (process.social_worker_id === currentSocialWorkerId) {
         // Asignado al trabajador social actual - mostrar "Revisar"
         return (
            <Button
               size="sm"
               onClick={() =>
                  router.push(
                     `/scholarships/aplications/review?id=${process.sccholarship_process_id}&student_id=${process.student_id}`
                  )
               }
               className="gap-2"
            >
               <Eye className="h-4 w-4" />
               Revisar
            </Button>
         );
      } else if (process.social_worker_id !== null) {
         // Asignado a otro trabajador social - mostrar "Ya tomado" (deshabilitado)
         return (
            <Button
               size="sm"
               variant="outline"
               disabled
               className="gap-2 bg-transparent"
            >
               <Eye className="h-4 w-4" />
               Ya tomado
            </Button>
         );
      } else {
         // No asignado aún - mostrar "Tomar"
         return (
            <Button
               size="sm"
               onClick={() => onTake?.(process.id)}
               className="gap-2"
            >
               <UserPlus className="h-4 w-4" />
               Tomar
            </Button>
         );
      }
   };

   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle>Procesos de Estudiantes</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="rounded-md border">
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>Estudiante</TableHead>
                        <TableHead>DNI</TableHead>
                        <TableHead>Estado Carga</TableHead>
                        <TableHead>Estado Revisión</TableHead>
                        <TableHead>Trabajador Social Asignado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {studentProcesses.length === 0 ? (
                        <TableRow>
                           <TableCell
                              colSpan={6}
                              className="text-center py-8 text-muted-foreground"
                           >
                              No hay procesos de estudiantes disponibles
                           </TableCell>
                        </TableRow>
                     ) : (
                        studentProcesses.map((process) => (
                           <TableRow key={process.id}>
                              <TableCell className="font-medium">
                                 <div className="flex flex-col">
                                    <span>{`${process.names} ${process.first_lastname}`}</span>
                                    {process.second_lastname && (
                                       <span className="text-sm text-muted-foreground">
                                          {process.second_lastname}
                                       </span>
                                    )}
                                 </div>
                              </TableCell>
                              <TableCell>
                                 {process.dni || (
                                    <span className="text-muted-foreground">
                                       Sin DNI
                                    </span>
                                 )}
                              </TableCell>
                              <TableCell>
                                 <Badge
                                    variant={getStatusBadgeVariant(
                                       process.student_upload_status
                                    )}
                                 >
                                    {getStatusText(
                                       process.student_upload_status
                                    )}
                                 </Badge>
                              </TableCell>
                              <TableCell>
                                 <Badge
                                    variant={getReviewStatusBadgeVariant(
                                       process.social_worker_review_status
                                    )}
                                 >
                                    {getReviewStatusText(
                                       process.social_worker_review_status
                                    )}
                                 </Badge>
                              </TableCell>
                              <TableCell>
                                 {process.social_worker_id ? (
                                    <div className="flex items-center gap-2">
                                       <div className="h-2 w-2 bg-green-500 rounded-full" />
                                       <span className="text-sm">
                                          {process.social_worker_id ===
                                          currentSocialWorkerId
                                             ? "Tú"
                                             : `ID: ${process.social_worker_id}`}
                                       </span>
                                    </div>
                                 ) : (
                                    <div className="flex items-center gap-2">
                                       <div className="h-2 w-2 bg-gray-400 rounded-full" />
                                       <span className="text-sm text-muted-foreground">
                                          Sin asignar
                                       </span>
                                    </div>
                                 )}
                              </TableCell>
                              <TableCell className="text-right">
                                 {renderActionButton(process)}
                              </TableCell>
                           </TableRow>
                        ))
                     )}
                  </TableBody>
               </Table>
            </div>
         </CardContent>
      </Card>
   );
}
