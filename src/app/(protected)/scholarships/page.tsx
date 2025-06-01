import { auth } from "@nextAuth/auth";
import LogoutButton from "@/components/button_logout/button_logout";
import { redirect } from "next/navigation";
import ButtonDemoNotification from "@/components/button-demo-notiicaction/button_demo_notification";

export default async function DashboardPage() {
   const session = await auth();
   if (!session) redirect("/log-in");
   return (
      <div className="container outline ">
         <div className="self-start text-2xl ">
            Hola, { session.user.names}
         </div>
         <div className="self-start text-2xl font-geist">
            Hola, { session.user.names}
         </div>
         <div className="self-start text-2xl font-slab font-semibold ">
            Hola, { session.user.names}
         </div>
         <div className="self-start  text-2xl font-mono">
            Hola, { session.user.names}
         </div>
         <article className="grid">

         </article>
         <pre>{JSON.stringify(session, null, 2)}</pre>
         <LogoutButton />
         <ButtonDemoNotification/>
      </div>
   );
}
