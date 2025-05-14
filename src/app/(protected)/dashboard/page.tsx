import { auth } from "@nextAuth/auth";
import LogoutButton from "@/components/button_logout/button_logout";

export default async function DashboardPage() {
   const session = await auth();
   
   return (
      <div className="container">
         <pre>{JSON.stringify(session, null, 2)}</pre>
         <LogoutButton />
         
      </div>
   );
}