"use server";

import { pusherServer } from "@/lib/pusher";
import { auth } from "@nextAuth/auth";
// Función para crear una notificación
export const sendMessage = async (message: string, toUserId: string) => {
   try {
      
      const session = await auth();
      const fromUserId = session?.user?.id;
      if (!fromUserId) {
         throw new Error("No autorizado");
      }
      /**
       * Aqui crear la logica para agregar la notificación a la base de datos
       */
      await pusherServer.trigger(
         `private-user-${toUserId}`,
         "new-notification",
         {
            fromUserId,
            message,
            created_at: new Date().toISOString(),
         }
      );
      
   } catch (error: any) {
      throw new Error(error.message);
   }
};
