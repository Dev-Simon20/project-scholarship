"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { pusherClient } from "@/lib/pusher";
import { Button } from "../ui/button";
import { sendMessage } from "@/actions/message.action";

const ButtonDemoNotification = () => {
   const handle = () => {
      sendMessage(
         "cmatvndro0000qnqw2b89gr69",
         "Error en la carga de archivos",
         "Ocurrió un error al subir tu constancia de estudios. Intenta nuevamente.",
         "warning"
      );
   };
   return <Button onClick={() => handle()}>Send Notification</Button>;
};
export default ButtonDemoNotification;
