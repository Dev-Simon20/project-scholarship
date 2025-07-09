import { auth } from "@nextAuth/auth";
import LogoutButton from "@/components/button_logout/button_logout";
import { redirect } from "next/navigation";
import ButtonDemoNotification from "@/components/button-demo-notiicaction/button_demo_notification";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ScholarshipProcessList } from "@/components/scholarship-process-list/scholarship-process-list";
import { getMockScholarshipProcesses } from "@/mocks/scholarshipsdata";
import { ScholarshipProcess } from "@/types/scholarship-process";
import { getAllScholarships } from "@/actions/scholarships/getAll";

export default async function DashboardPage() {
   const session = await auth();
   if (!session) redirect("/log-in");
     let processes: ScholarshipProcess[] = [];
   const res = await getAllScholarships();
   if ("error" in res) {
      console.error("Error al obtener las notificaciones", res.error);
   } else {
      processes = res;
   }


   return (
      <div className="container mx-auto py-8 px-4">
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
               <h1 className="text-3xl font-bold">Procesos de Beca</h1>
               <p className="text-muted-foreground mt-1">
                  Gestiona todos los procesos de beca disponibles
               </p>
            </div>
            <Link href="/scholarships/create">
               <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Crear Nuevo Proceso
               </Button>
            </Link>
         </div>

         {/* <ScholarshipFilters /> */}

         <div className="mt-6">
            <ScholarshipProcessList initialProcesses={processes} />
         </div>
      </div>
   );
}
