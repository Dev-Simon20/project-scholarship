import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ButtonDarkMode from "../button-dark-mode/button-dark-mode";
import BreadcrumbCustomize from "./breadcrumb";
import UserMenu from "./user-menu";
import Notifications from "./notifications";
import { Button } from "../ui/button";
import { GraduationCap } from "lucide-react";
import { Badge } from "../ui/badge";

interface PropsSiteHeader {
   names: string;
   id: string;
   role: string;
}
export function SiteHeader({ names, id, role }: PropsSiteHeader) {
   return (
      <header className="flex h-16  items-center gap-2  justify-between bg-blue-700 w-full">
         <div className="flex items-center gap-2 px-4">
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-blue-800 text-white">
               <GraduationCap className="size-5" />
            </div>
            <div className="flex items-center gap-2  text-white">
               <p className="hidden md:block">{names}</p>
               <Badge className="bg-blue-800 text-white">{role}</Badge>
            </div>

            <Separator
               orientation="vertical"
               className="mx-2 data-[orientation=vertical]:h-4 hidden md:block"
            />
            <BreadcrumbCustomize
               classNameBreadList="hidden md:flex"
               classNameBreadLink="text-gray-300 hover:text-white"
            />
         </div>
         <div className="flex items-center gap-4  px-4">
            <ButtonDarkMode />
            <Notifications id={id} />

            <UserMenu names={names} />
         </div>
      </header>
   );
}
