import { AppSidebar } from "@/components/app_sidebar/app_siberbar";
import ButtonDarkMode from "@/components/button-dark-mode/button-dark-mode";
import BreadcrumbCustomize from "@/components/site-header/breadcrumb";
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
      <main className=" w-screen min-h-screen flex flex-col items-center">
         <SiteHeader id={session.user.id} names={session.user.names} role={session.user.role} />
         <div className="container">
            <BreadcrumbCustomize/>
         </div>
         {children}
      </main>
   );
}
