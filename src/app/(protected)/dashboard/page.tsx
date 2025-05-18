import { auth } from "@nextAuth/auth";
import LogoutButton from "@/components/button_logout/button_logout";
import { redirect } from "next/navigation";
import ButtonDemoNotification from "@/components/button-demo-notiicaction/button_demo_notification";

export default async function DashboardPage() {
   const session = await auth();
   if (!session) redirect("/log-in");
   return (
      <div className="container">
         <pre>{JSON.stringify(session, null, 2)}</pre>
         <LogoutButton />
         <ButtonDemoNotification/>
      </div>
   );
}
