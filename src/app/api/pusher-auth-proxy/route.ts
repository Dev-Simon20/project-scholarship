// src/app/api/pusher-auth-proxy/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authenticatePusher } from "@/actions/pusherAuth";

// Esta ruta es el endpoint que se agrega al crear el pusher Client en ./pusherAuth
export async function POST(req: NextRequest) {
   const formData = await req.text(); // obtenemos el string plano
   const params = new URLSearchParams(formData);

   const socket_id = params.get("socket_id");
   const channel_name = params.get("channel_name");

   if (!socket_id || !channel_name) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
   }

   try {
      const authResponse = await authenticatePusher(socket_id, channel_name);
      return NextResponse.json(authResponse);
   } catch (error) {
      return NextResponse.json(
         { error: (error as Error).message },
         { status: 403 }
      );
   }
}
