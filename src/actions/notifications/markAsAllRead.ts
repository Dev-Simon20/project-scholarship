"use server";

import { prismaDb } from "@/lib/db";
import { auth } from "@nextAuth/auth";
import { AuthError } from "next-auth";

export const markAsAllRead = async () => {
   try {
      const session = await auth();
      const user_id = session?.user.id;
      if (!user_id) {
         throw new Error("Session dont exist");
      }

      await prismaDb.notification.updateMany({
         where: {
            user_id: user_id,
         },
         data: {
            read: true,
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
         error: "Error unknow 505",
      };
   }
};
