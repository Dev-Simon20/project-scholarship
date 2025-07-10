import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Calendar,
   Clock,
   FileText,
   Users,
   Edit,
   Trash2,
   Eye,
} from "lucide-react";
import Link from "next/link";
import { ScholarshipProcess } from "@/types/scholarship-process";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { isncriptionScholarShip } from "@/actions/scholarships/inscription";
import { toast } from "sonner";

interface ScholarshipProcessCardProps {
   process: ScholarshipProcess;
}

export function ScholarshipProcessCard({
   process,
}: ScholarshipProcessCardProps) {
   const { data: session, status } = useSession();
   const router = useRouter();

   // Determinar el estado del proceso
   const now = new Date();
   const openDate = new Date(process.open_date);
   const closeDate = new Date(process.close_date);

   const isOpen = now >= openDate && now <= closeDate;
   const isClosed = now > closeDate;
   const isUpcoming = now < openDate;

   // Formatear fechas
   const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("es", {
         day: "2-digit",
         month: "short",
         year: "numeric",
      }).format(date);
   };

   // Calcular días restantes o pasados
   const getDaysMessage = () => {
      if (isUpcoming) {
         const daysToStart = Math.ceil(
            (openDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
         );
         return `Comienza en ${daysToStart} día${daysToStart !== 1 ? "s" : ""}`;
      }

      if (isOpen) {
         const daysToEnd = Math.ceil(
            (closeDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
         );
         return `${daysToEnd} día${daysToEnd !== 1 ? "s" : ""} restante${
            daysToEnd !== 1 ? "s" : ""
         }`;
      }

      const daysSinceEnd = Math.ceil(
         (now.getTime() - closeDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return `Cerrado hace ${daysSinceEnd} día${daysSinceEnd !== 1 ? "s" : ""}`;
   };

   // Determinar el color del badge según el estado
   const getBadgeVariant = () => {
      if (isOpen) return "success";
      if (isClosed) return "destructive";
      return "default";
   };

   const getStatusText = () => {
      if (isOpen) return "Abierto";
      if (isClosed) return "Cerrado";
      return "Próximamente";
   };

   const inscription = async (id: number) => {
      const res = await isncriptionScholarShip(id);
      console.log(res);
      toast.success("Inscripcion correcta");
   };
   if (status === "loading") {
      return null; // O un <Loader /> si prefieres mostrar algo
   }
   return (
      <Card className="h-full flex flex-col">
         <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
               <Badge variant={getBadgeVariant() as any} className="mb-2">
                  {getStatusText()}
               </Badge>
            </div>
            <h3 className="text-xl font-bold line-clamp-2">{process.title}</h3>
            <p className="text-muted-foreground line-clamp-2">
               {process.sub_title}
            </p>
         </CardHeader>

         <CardContent className="pb-4 flex-grow">
            <div className="space-y-3">
               <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                     {formatDate(openDate)} - {formatDate(closeDate)}
                  </span>
               </div>

               <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{getDaysMessage()}</span>
               </div>

               <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>
                     {process.requirements} requisito
                     {process.requirements !== 1 ? "s" : ""}
                  </span>
               </div>

               <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>
                     {process.student_processes || 0} postulante
                     {(process.student_processes || 0) !== 1 ? "s" : ""}
                  </span>
               </div>
            </div>
         </CardContent>

         <CardFooter className="pt-2 border-t flex justify-between">
            {session?.user.role && session.user.role === "admin" && (
               <div className="flex gap-2">
                  <Link href={`/scholarship-process/${process.id}/edit`}>
                     <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                     >
                        <Edit className="h-4 w-4" />
                        Editar
                     </Button>
                  </Link>

                  <Button
                     variant="ghost"
                     size="sm"
                     className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                     <Trash2 className="h-4 w-4" />
                     Eliminar
                  </Button>
               </div>
            )}
            {session?.user.role && session.user.role === "student" && (
               <div className="flex gap-2">
                  {process.status_inscription === false ? (
                     <Button
                        onClick={() => inscription(process.id)}
                        className="bg-blue-700 hover:bg-blue-600"
                        disabled={!isOpen}
                     >
                        Inscribirse
                     </Button>
                  ) : (
                     <Button
                        onClick={() =>
                           router.push(
                              `/scholarships/aplications/inscription?id=${process.id}`
                           )
                        }
                        className="bg-blue-700 hover:bg-blue-600"
                        disabled={!isOpen}
                     >
                        Subir documentos
                     </Button>
                  )}
               </div>
            )}
            {session?.user.role && session.user.role === "social_worker" && (
               <div className="flex gap-2">
                  <Button
                     onClick={() =>
                        router.push(
                           `/scholarships/aplications?id=${process.id}`
                        )
                     }
                     className="bg-blue-700 hover:bg-blue-600"
                  >
                     Ver Inscripciones
                  </Button>
               </div>
            )}
         </CardFooter>
      </Card>
   );
}
