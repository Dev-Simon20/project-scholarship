import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

const CreateSocialWorkerpage = () => {
   return (
      <div className="container outline">
         <Card className="max-w-96">
            <CardHeader>
               <CardTitle>Create Social Work</CardTitle>
               <CardDescription>
                  Completa la información correctamente para crear un(a)
                  trabajador(a) social
               </CardDescription>
            </CardHeader>
         </Card>
      </div>
   );
};
export default CreateSocialWorkerpage;
