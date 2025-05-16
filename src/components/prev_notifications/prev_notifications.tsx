"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { pusherClient } from "@/lib/pusher";
import { Button } from "../ui/button";
import { sendMessage } from "@/actions/message.action";

const PrevNotifications = ({ id }: { id: string }) => {
   const [messages, setMessages] = useState<string[]>([]);

   useEffect(() => {
      pusherClient.subscribe(`private-user-${id}`);      
      pusherClient.bind("new-notification", (data: { message: string }) => {
         setMessages((prev) => [...prev, data.message]);
         
      });

      return () => pusherClient.unsubscribe(`private-user-${id}`);
   }, []);

     const handle=()=>{
      sendMessage('Hola mundo','cman1reo40001qnxg6elybrdh')
  }
   return (
      <Card className="w-[350px] min-h-32 flex flex-col">
         <CardHeader>Notificaciones</CardHeader>
         <CardContent>
            {!messages.length ? (
               <div className="text-center text-gray-500">No messages yet</div>
            ) : (
               messages.map((message, index) => <p key={index}>{message}</p>)
            )}
         </CardContent>
         <div className="">
        <Button onClick={()=>handle()}>
          Send Notification
        </Button>
      </div>
      </Card>
   );
};
export default PrevNotifications;
