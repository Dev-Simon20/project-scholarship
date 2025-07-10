import { AlertTriangle, Check, CircleUserRound, Info, Sun, User, User2Icon, X } from "lucide-react";
import { Button } from "../ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoutButton from "../button_logout/button_logout";

const UserMenu = ({ names }: { names: string }) => {
   const letter = names.charAt(0);

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="flex items-center gap-1" asChild>
            <Button
               variant={"outline"}
               size={"icon"}
               className="uppercase rounded-full"
            >
               {letter}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Themes</DropdownMenuItem>
            <DropdownMenuItem asChild>
               <LogoutButton/>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
export default UserMenu;
