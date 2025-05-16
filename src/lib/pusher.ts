import PusherServer from "pusher";
import Pusher from "pusher-js";

export const pusherServer = new PusherServer({
   appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
   key: process.env.NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY!,
   secret: process.env.PUSHER_SECRET_KEY!,
   cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
   useTLS: true,
});

//Este pusher se utulizara para recibir las notificaciones en tiempo real
export const pusherClient = new Pusher(
   process.env.NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY!,
   {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: '/api/pusher-auth-proxy',
   }
);
