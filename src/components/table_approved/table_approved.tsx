import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, User } from "lucide-react";
import { StudentProcess } from "@/types/student-process";

interface ApprovedStudentsTableProps {
   students: StudentProcess[];
}

export default function ApprovedStudentsTable({
   students,
}: ApprovedStudentsTableProps) {
   // Filtrar solo estudiantes aprobados
   const approvedStudents = students.filter(
      (student) => student.social_worker_review_status === "approved"
   );

   if (approvedStudents.length === 0) {
      return (
         <Card>
            <CardContent className="text-center py-12">
               <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
               <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No hay estudiantes aprobados
               </h3>
               <p className="text-sm text-muted-foreground">
                  Aún no hay estudiantes con estado aprobado en el sistema.
               </p>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-2xl">
                     Estudiantes Aprobados
                  </CardTitle>
               </div>
               <Badge variant="secondary" className="text-sm">
                  {approvedStudents.length} estudiante
                  {approvedStudents.length !== 1 ? "s" : ""}
               </Badge>
            </div>
         </CardHeader>

         <CardContent>
            <div className="rounded-md border">
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Nombre Completo</TableHead>
                        <TableHead>DNI</TableHead>
                        <TableHead>Trabajador Social</TableHead>
                        <TableHead className="text-center">Estado</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {approvedStudents.map((student) => (
                        <TableRow
                           key={student.id}
                           className="hover:bg-muted/50"
                        >
                           <TableCell className="font-mono text-sm">
                              {student.student_id.slice(0, 4)}
                           </TableCell>

                           <TableCell>
                              <div className="space-y-1">
                                 <div className="font-medium">
                                    {student.names} {student.first_lastname}{" "}
                                    {student.second_lastname}
                                 </div>
                              </div>
                           </TableCell>

                           <TableCell className="font-mono">
                              {student.dni || (
                                 <span className="text-muted-foreground italic">
                                    Sin DNI
                                 </span>
                              )}
                           </TableCell>

                           <TableCell>
                              <div className="flex items-center gap-2">
                                 <User className="h-4 w-4 text-muted-foreground" />
                                 <span className="text-sm">
                                    {student.social_worker_name}
                                 </span>
                              </div>
                           </TableCell>

                           <TableCell className="text-center">
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                 <CheckCircle className="h-3 w-3 mr-1" />
                                 Aprobado
                              </Badge>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
               Mostrando {approvedStudents.length} estudiantes aprobados
            </div>
         </CardContent>
      </Card>
   );
}
