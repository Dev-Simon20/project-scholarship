"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
   Upload,
   FileText,
   Download,
   CheckCircle,
   Clock,
   AlertCircle,
   X,
   GraduationCap,
} from "lucide-react";
import {
   type ScholarshipProcess,
   type Requirement,
   type UserDocument,
} from "@/types/scholarship-student";
import { ReviewStatus, SocialWorkerReviewStatus } from "@prisma/client";
import { toast } from "sonner";
import { updateStatuStudentDocument } from "@/actions/studentDocument/update";
import { aprobeScholarShip } from "@/actions/scholarships/aprobe";
import { dataForApllication } from "@/types/student-process";
import ApplicationHeader from "../aplication_header/aplication_header";

interface ScholarshipDocumentUploadProps {
   scholarshipProcess: ScholarshipProcess;
   requirements: Requirement[];
   userDocuments: UserDocument[];
   onDocumentUpload?: (requirementId: number, file: string) => Promise<void>;
   userRole: string;
   getData: () => void;
   studentData: dataForApllication;
}
// npx shadcn@latest add alert
// 🔧 Función fake para simular subida de archivos
const simulateFileUpload = async (file: File) => {
   const formData = new FormData();

   formData.append("file", file);
   try {
      const res = await fetch("/api/upload", {
         method: "POST",
         body: formData,
      });

      const result = await res.json();
      console.log("el result es ", result);

      if (res.ok) {
         toast.success("Archivo subido con éxito");
         return result.data;
      } else {
         console.error(result.error);
         throw new Error("Error al subir el archivo");
      }
   } catch (error) {
      toast.error("Error al enviar el archivo:");
      return null;
   }
};

export default function ScholarshipDocumentUpload({
   scholarshipProcess,
   requirements,
   userDocuments,
   onDocumentUpload,
   userRole,
   getData,
   studentData,
}: ScholarshipDocumentUploadProps) {
   const [uploadingFiles, setUploadingFiles] = useState<Set<number>>(new Set());
   const [uploadedDocuments, setUploadedDocuments] = useState<
      Map<number, UserDocument>
   >(new Map(userDocuments.map((doc) => [doc.requirement_id, doc])));
   const [errors, setErrors] = useState<Map<number, string>>(new Map());
   const fileInputRefs = useRef<Map<number, HTMLInputElement>>(new Map());

   const [editedStatuses, setEditedStatuses] = useState<
      Map<number, ReviewStatus>
   >(new Map());

   const handleStatusChange = (
      requirementId: number,
      newStatus: ReviewStatus
   ) => {
      setEditedStatuses((prev) => new Map(prev.set(requirementId, newStatus)));
   };
   const handleSaveStatus = async (requirementId: number) => {
      const newStatus = editedStatuses.get(requirementId);
      const userDoc = uploadedDocuments.get(requirementId);

      if (!newStatus || !userDoc) return;

      const res = await updateStatuStudentDocument(userDoc.id, newStatus);

      if ("error" in res) {
         toast.error("Error al actualizar el esatdo");
      } else {
         await getData();
         toast.success("Estado actualizado");
      }
   };

   const getStatusColor = (status: ReviewStatus) => {
      switch (status) {
         case ReviewStatus.Approved:
            return "bg-green-100 text-green-800 border-green-200";
         case ReviewStatus.NeedsChanges:
            return "bg-red-100 text-red-800 border-red-200";
         case ReviewStatus.Pending:
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
         default:
            return "bg-gray-100 text-gray-800 border-gray-200";
      }
   };

   const getStatusIcon = (status: ReviewStatus) => {
      switch (status) {
         case ReviewStatus.Approved:
            return <CheckCircle className="w-4 h-4" />;
         case ReviewStatus.NeedsChanges:
            return <AlertCircle className="w-4 h-4" />;
         case ReviewStatus.Pending:
            return <Clock className="w-4 h-4" />;
         default:
            return null;
      }
   };

   const validateFile = (
      file: File,
      requirement: Requirement
   ): string | null => {
      // Validar tamaño
      const maxSizeMB = Number.parseFloat(requirement.max_size_mb);
      const fileSizeMB = file.size / (1024 * 1024);

      if (fileSizeMB > maxSizeMB) {
         return `El archivo excede el tamaño máximo de ${requirement.max_size_mb}MB`;
      }

      // Validar tipo de archivo
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const allowedExtensions = requirement.allowed_file_types.map((type) =>
         type.toLowerCase()
      );

      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
         return `Tipo de archivo no permitido. Formatos aceptados: ${requirement.allowed_file_types.join(
            ", "
         )}`;
      }

      return null;
   };

   const handleFileUpload = async (requirementId: number, file: File) => {
      const requirement = requirements.find((r) => r.id === requirementId);
      if (!requirement) return;

      // Limpiar errores previos
      setErrors((prev) => {
         const newErrors = new Map(prev);
         newErrors.delete(requirementId);
         return newErrors;
      });

      // Validar archivo
      const validationError = validateFile(file, requirement);
      if (validationError) {
         setErrors((prev) => new Map(prev.set(requirementId, validationError)));
         return;
      }

      // Iniciar proceso de subida
      setUploadingFiles((prev) => new Set(prev.add(requirementId)));

      try {
         // Simular subida
         const fileUrl = await simulateFileUpload(file);
         if (!fileUrl) {
         }
         // Crear documento simulado
         const newDocument: UserDocument = {
            id: Date.now(), // ID temporal
            file_url: fileUrl,
            review_status: ReviewStatus.Pending,
            requirement_id: requirementId,
         };

         // Actualizar estado local
         setUploadedDocuments(
            (prev) => new Map(prev.set(requirementId, newDocument))
         );

         // Llamar callback si existe
         if (onDocumentUpload) {
            await onDocumentUpload(requirementId, fileUrl);
         }
      } catch (error) {
         setErrors(
            (prev) =>
               new Map(
                  prev.set(
                     requirementId,
                     "Error al subir el archivo. Inténtalo de nuevo."
                  )
               )
         );
      } finally {
         setUploadingFiles((prev) => {
            const newSet = new Set(prev);
            newSet.delete(requirementId);
            return newSet;
         });
      }
   };

   const handleFileSelect = (
      requirementId: number,
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      const file = event.target.files?.[0];
      if (file) {
         handleFileUpload(requirementId, file);
      }
   };

   const removeDocument = (requirementId: number) => {
      setUploadedDocuments((prev) => {
         const newMap = new Map(prev);
         newMap.delete(requirementId);
         return newMap;
      });

      // Limpiar input
      const input = fileInputRefs.current.get(requirementId);
      if (input) {
         input.value = "";
      }
   };

   const getCompletionProgress = () => {
      console.log("requerimeintos", requirements);

      const totalRequirements = requirements.length;
      const completedRequirements = requirements.filter((req) =>
         uploadedDocuments.has(req.id)
      ).length;

      return {
         completed: completedRequirements,
         total: totalRequirements,
         percentage:
            totalRequirements > 0
               ? (completedRequirements / totalRequirements) * 100
               : 0,
      };
   };

   const progress = getCompletionProgress();
   const isProcessComplete =
      progress.completed === progress.total && progress.total > 0;

   const handleCompleteProcess = () => {
      console.log("Felicidades, completaste el proceso.");
   };

   const handleAprove = async () => {
      if (userDocuments[0].student_process_id) {
         aprobeScholarShip(userDocuments[0].student_process_id);
         toast.success("Aplicacion aprobada");
      }
      //
   };

   return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
         {/* Header del proceso */}
         <Card>
            <CardHeader>
               <CardTitle className="text-2xl">
                  {scholarshipProcess.title}
               </CardTitle>
               <CardDescription className="text-lg">
                  {scholarshipProcess.subtitle}
               </CardDescription>
               {scholarshipProcess.comment && (
                  <Alert>
                     <AlertDescription>
                        {scholarshipProcess.comment}
                     </AlertDescription>
                  </Alert>
               )}
            </CardHeader>
            <CardContent>
               <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                     <span>Progreso del proceso</span>
                     <span>
                        {progress.completed} de {progress.total} documentos
                     </span>
                  </div>
                  <Progress value={progress.percentage} className="w-full" />
               </div>
            </CardContent>
         </Card>
         <ApplicationHeader data={studentData} />
         {/* Lista de requisitos */}
         <div className="space-y-4">
            {requirements.map((requirement) => {
               const isUploading = uploadingFiles.has(requirement.id);
               const uploadedDoc = uploadedDocuments.get(requirement.id);
               const error = errors.get(requirement.id);

               return (
                  <Card key={requirement.id} className="relative">
                     <CardHeader>
                        <div className="flex items-start justify-between">
                           <div className="space-y-1">
                              <CardTitle className="text-lg flex items-center gap-2">
                                 Paso {requirement.step_number}:{" "}
                                 {requirement.title}
                                 {uploadedDoc && (
                                    <Badge
                                       className={getStatusColor(
                                          uploadedDoc.review_status
                                       )}
                                    >
                                       {getStatusIcon(
                                          uploadedDoc.review_status
                                       )}
                                       <span className="ml-1">
                                          {uploadedDoc.review_status}
                                       </span>
                                    </Badge>
                                 )}
                              </CardTitle>
                              <CardDescription>
                                 {requirement.sub_title}
                              </CardDescription>
                           </div>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                           <span>
                              Tamaño máximo: {requirement.max_size_mb}MB
                           </span>
                           <span>•</span>
                           <span>
                              Formatos:{" "}
                              {requirement.allowed_file_types.join(", ")}
                           </span>
                        </div>
                     </CardHeader>

                     <CardContent className="space-y-4">
                        {/* Archivo de ejemplo */}
                        {requirement.url_file_example && (
                           <Alert>
                              <Download className="h-4 w-4" />
                              <AlertDescription>
                                 <a
                                    href={requirement.url_file_example}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                 >
                                    Descargar archivo de ejemplo
                                 </a>
                              </AlertDescription>
                           </Alert>
                        )}

                        {/* Estado del documento */}
                        {uploadedDoc ? (
                           userRole === "student" ? (
                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                 <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-gray-600" />
                                    <div>
                                       <p className="font-medium">
                                          Documento subido
                                       </p>
                                       <p className="text-sm text-muted-foreground">
                                          Estado: {uploadedDoc.review_status}
                                       </p>
                                    </div>
                                 </div>
                                 <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                       removeDocument(requirement.id)
                                    }
                                 >
                                    <X className="w-4 h-4 mr-1" />
                                    Cambiar
                                 </Button>
                              </div>
                           ) : (
                              <div className="space-y-4">
                                 <Alert>
                                    <Download className="h-4 w-4" />
                                    <AlertDescription>
                                       {uploadedDoc.file_url ? (
                                          <a
                                             href={uploadedDoc.file_url}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="text-blue-600 hover:text-blue-800 underline"
                                          >
                                             Descargar documento subido
                                          </a>
                                       ) : (
                                          <span className="text-muted-foreground">
                                             Documento no disponible
                                          </span>
                                       )}
                                    </AlertDescription>
                                 </Alert>

                                 {/* Select para cambiar el estado */}
                                 <div className="flex items-center gap-2">
                                    <label
                                       htmlFor={`review-status-${requirement.id}`}
                                       className="text-sm"
                                    >
                                       Estado de revisión:
                                    </label>
                                    <select
                                       id={`review-status-${requirement.id}`}
                                       value={
                                          editedStatuses.get(requirement.id) ??
                                          uploadedDoc.review_status
                                       }
                                       onChange={(e) =>
                                          handleStatusChange(
                                             requirement.id,
                                             e.target.value as ReviewStatus
                                          )
                                       }
                                       className="border rounded px-2 py-1 text-sm"
                                       disabled={
                                          studentData.social_worker_review_status ===
                                          SocialWorkerReviewStatus.approved
                                       }
                                    >
                                       {Object.values(ReviewStatus).map(
                                          (status) => (
                                             <option
                                                key={status}
                                                value={status}
                                             >
                                                {status}
                                             </option>
                                          )
                                       )}
                                    </select>
                                    <Button
                                       size="sm"
                                       onClick={() =>
                                          handleSaveStatus(requirement.id)
                                       }
                                    >
                                       Guardar estado
                                    </Button>
                                 </div>
                              </div>
                           )
                        ) : userRole === "student" ? (
                           <div className="space-y-2">
                              <input
                                 ref={(el) => {
                                    if (el)
                                       fileInputRefs.current.set(
                                          requirement.id,
                                          el
                                       );
                                 }}
                                 type="file"
                                 accept={requirement.allowed_file_types
                                    .map((type) => `.${type}`)
                                    .join(",")}
                                 onChange={(e) =>
                                    handleFileSelect(requirement.id, e)
                                 }
                                 className="hidden"
                                 id={`file-${requirement.id}`}
                              />
                              <Button
                                 variant="outline"
                                 className="w-full h-20 border-dashed bg-transparent"
                                 disabled={isUploading}
                                 onClick={() => {
                                    const input = fileInputRefs.current.get(
                                       requirement.id
                                    );
                                    input?.click();
                                 }}
                              >
                                 <div className="flex flex-col items-center gap-2">
                                    <Upload className="w-6 h-6" />
                                    <span>
                                       {isUploading
                                          ? "Subiendo archivo..."
                                          : "Seleccionar archivo"}
                                    </span>
                                 </div>
                              </Button>
                           </div>
                        ) : (
                           <div>
                              <p className="text-sm font-medium text-gray-600">
                                 Aún no han subido archivos
                              </p>
                           </div>
                        )}

                        {/* Error */}
                        {error && (
                           <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{error}</AlertDescription>
                           </Alert>
                        )}

                        {/* Progreso de subida */}
                        {isUploading && (
                           <div className="space-y-2">
                              <Progress value={50} className="w-full" />
                              <p className="text-sm text-muted-foreground text-center">
                                 Subiendo archivo...
                              </p>
                           </div>
                        )}
                     </CardContent>
                  </Card>
               );
            })}
         </div>

         {/* Botón completar proceso */}
         <Card>
            <CardContent className="">
               {studentData.social_worker_review_status ===
               SocialWorkerReviewStatus.approved ? (
                  <Card className="w-full max-w-md mx-auto shadow-none outline-none border-0">
                     <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                           <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-green-700">
                           ¡Felicidades!
                        </CardTitle>
                        <CardDescription className="text-lg">
                           Tu proceso de beca ha sido aprobado
                        </CardDescription>
                     </CardHeader>
                  </Card>
               ) : userRole === "student" ? (
                  <Button
                     onClick={handleCompleteProcess}
                     disabled={!isProcessComplete}
                     className="w-full"
                     size="lg"
                  >
                     <CheckCircle className="w-5 h-5 mr-2" />
                     Completar proceso
                  </Button>
               ) : (
                  <Button
                     onClick={handleAprove}
                     disabled={!isProcessComplete}
                     className="w-full"
                     size="lg"
                  >
                     <CheckCircle className="w-5 h-5 mr-2" />
                     Aprobar Proceso
                  </Button>
               )}

               {!isProcessComplete && (
                  <p className="text-sm text-muted-foreground text-center mt-2">
                     Sube todos los documentos requeridos para completar el
                     proceso
                  </p>
               )}
            </CardContent>
         </Card>
      </div>
   );
}
