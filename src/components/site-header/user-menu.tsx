import { CircleUserRound, Sun, User, User2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserMenu = ({ names }: { names: string }) => {
   const letter = names.charAt(0);

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="flex items-center gap-1" asChild>
            <Button
               variant={"ghost"}
               size={"icon"}
               className="uppercase  bg-gray-200 hover:bg-gray-200 dark:bg-neutral-900 cursor-pointer !text-[#ff6a00] hover:text-[#ff6a00]"
            >
               {letter}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem>Documentation</DropdownMenuItem>
            <DropdownMenuItem>Themes</DropdownMenuItem>
            <DropdownMenuItem>GitHub</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
export default UserMenu;
