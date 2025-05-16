import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ButtonDarkMode from "../button-dark-mode/button-dark-mode";
import BreadcrumbCustomize from "./breadcrumb";
import UserMenu from "./user-menu";
import Notifications from "./notifications";

interface PropsSiteHeader {
   names: string;
   id: string;
}
export function SiteHeader({ names, id }: PropsSiteHeader) {
   return (
      <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear justify-between ">
         <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
               orientation="vertical"
               className="mx-2 data-[orientation=vertical]:h-4"
            />
            <BreadcrumbCustomize />
         </div>
         <div className="flex items-center gap-4  px-4">
            <ButtonDarkMode />
            <Notifications id={id} />

            <UserMenu names={names} />
         </div>
      </header>
   );
}
