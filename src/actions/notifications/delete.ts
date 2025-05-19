"use server";

import { prismaDb } from "@/lib/db";
import { auth } from "@nextAuth/auth";
import { AuthError } from "next-auth";

export const deleteNotification = async (id_notification: number) => {
   try {
      const session = await auth();
      const user_id = session?.user.id;
      if (!user_id) {
         throw new Error("The session dont exist");
      }
      await prismaDb.notification.delete({
         where: {
            id: id_notification,
         },
      });
   } catch (error) {
      if (error instanceof AuthError) {
         return {
            error: error.cause?.err?.message,
         };
      }
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return {
         error: "Error desconocido",
      };
   }
};
