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

export default async function ProtectedLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await auth();
   if (!session) redirect("/log-in");
   return (
      <main className="w-screen h-screen flex flex-col  font-slab">
         <SiteHeader
            id={session.user.id}
            names={session.user.names}
            role={session.user.role}
         />
         <article className="flex-1 w-full p-2 md:p-0  overflow-auto flex flex-col items-center bg-green-500">
            <div className="container flex md:hidden ">
               <BreadcrumbCustomize classNameBreadLink="text-gray-600 dark:text-white" />
            </div>
            {children}
         </article>
      </main>
   );
}
