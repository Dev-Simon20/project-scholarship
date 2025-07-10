import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, GraduationCap, BadgeIcon as IdCard, Hash } from "lucide-react";
import { dataForApllication } from "@/types/student-process";

interface ApplicationHeaderProps {
   data: dataForApllication;
}

export default function ApplicationHeader({ data }: ApplicationHeaderProps) {
   const fullName = `${data.names} ${data.first_lastname} ${data.second_lastname}`;

   return (
      <Card className="w-full  py-2">
         <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
               <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <User className="h-6 w-6" />
                  Información del Solicitante
               </CardTitle>
               <Badge variant="outline" className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  {data.code_university}
               </Badge>
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                     <User className="h-4 w-4" />
                     Nombre Completo
                  </div>
                  <p className="text-lg font-semibold">{fullName}</p>
               </div>

               <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                     <IdCard className="h-4 w-4" />
                     Documento de Identidad
                  </div>
                  <p className="text-lg font-semibold">{data.dni}</p>
               </div>
            </div>

            <div className="space-y-2">
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  Institución Educativa
               </div>
               <p className="text-lg font-semibold">{data.school_name}</p>
            </div>
         </CardContent>
      </Card>
   );
}
