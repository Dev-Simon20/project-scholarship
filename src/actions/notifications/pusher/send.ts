"use server";

import { prismaDb } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { auth } from "@nextAuth/auth";
import { NotificationType } from "@prisma/client";
import { AuthError } from "next-auth";
// Función para crear una notificación
export const sendNotification = async (
   toUserId: string,
   message: string,
   title: string,
   type: NotificationType
) => {
   try {
      const session = await auth();
      const fromUserId = session?.user?.id;
      if (!fromUserId) {
         throw new Error("No autorizado");
      }
      /**
       * Aqui crear la logica para agregar la notificación a la base de datos
       */
      const noti = await prismaDb.notification.create({
         data: {
            user_id: toUserId,
            message: message,
            read: false,
            title: title,
            type: type,
         },
      });
      console.log(`se envi la noto al usario private-user-${toUserId}`);

      await pusherServer.trigger(
         `private-user-${toUserId}`,
         "new-notification",
         { noti }
      );
   } catch (error) {
      if (error instanceof AuthError) {
         console.log("error de AuthError", error.cause?.err?.message);
      }
      if (error instanceof Error) {
         console.log("error de Error", error);
      }
      console.log("error desconodido");
   }
};
