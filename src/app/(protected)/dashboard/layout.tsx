import { AppSidebar } from "@/components/app_sidebar/app_siberbar";
import ButtonDarkMode from "@/components/button-dark-mode/button-dark-mode";
import { SiteHeader } from "@/components/site-header/site-header";
import {
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@nextAuth/auth";
import { redirect } from "next/navigation";

export default async function SchoolDashboardLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await auth();
   if (!session) redirect("/log-in");
   return (
      <SidebarProvider>
         <AppSidebar variant="inset" />
         <SidebarInset>
            <SiteHeader id={session.user.id} names={session.user.names} />
            {children}
         </SidebarInset>
      </SidebarProvider>
   );
}
