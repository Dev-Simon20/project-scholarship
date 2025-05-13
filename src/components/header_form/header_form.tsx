import { GraduationCap } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

interface PropsHeaderForm {
   title: string;
   description: string;
}

const Headerform = ({ title, description }: PropsHeaderForm) => {
   return (
      <CardHeader className="bg-blue-600 px-5 py-6 flex items-center !text-white">
         <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <GraduationCap className="h-5 w-5 text-white" />
         </div>
         <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-sm text-white">
               {description}
            </CardDescription>
         </div>
      </CardHeader>
   );
};
export default Headerform;
