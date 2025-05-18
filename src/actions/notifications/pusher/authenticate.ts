"use server";

import { pusherServer } from "@/lib/pusher";
import { auth } from "@nextAuth/auth";


// Funcion para autenticar el canal al que se suscribe el usario
// Esta funcion se llama desde la ruta /api/pusher-auth-proxy
export async function authenticatePusher(
   socketId: string,
   channelName: string
) {
   const session = await auth();
   const userId = session?.user?.id;

   if (!userId) {
      throw new Error("No autorizado");
   }

   const expectedChannel = `private-user-${userId}`;   
   
   if (channelName !== expectedChannel) {
      throw new Error("Canal inválido");
   }

   const authResponse = pusherServer.authorizeChannel(
      socketId,
      channelName
   );
   return authResponse;
}
