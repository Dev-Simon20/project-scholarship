import {
   ArrowUpCircleIcon,
   Calendar,
   GraduationCap,
   Home,
   Inbox,
   Search,
   Settings,
   ShoppingBag,
} from "lucide-react";

import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react"; // Menu items.
const items = [
   {
      title: "Home",
      url: "#",
      icon: Home,
   },
   {
      title: "Inbox",
      url: "#",
      icon: Inbox,
   },
   {
      title: "Calendar",
      url: "#",
      icon: Calendar,
   },
   {
      title: "Search",
      url: "#",
      icon: Search,
   },
   {
      title: "Settings",
      url: "#",
      icon: Settings,
   },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar collapsible="icon" {...props}>
         <SidebarHeader>
            <SidebarMenuButton size="lg">
               <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-orange-100  text-orange-700">
                  <GraduationCap className="size-4" />
               </div>
               <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ScholaShip</span>
                  <span className="truncate text-xs">Enterprise</span>
               </div>
            </SidebarMenuButton>
         </SidebarHeader>
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>Application</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild size={"lg"}>
                              <a href={item.url}>
                                 <item.icon className="ml-1.5 !size-5" />
                                 <span className="text-md font-light">
                                    {item.title}
                                 </span>
                              </a>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
      </Sidebar>
   );
}
