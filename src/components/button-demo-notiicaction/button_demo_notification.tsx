"use client";


import { Button } from "../ui/button";
import { sendNotification } from "@/actions/notifications/pusher/send";

const ButtonDemoNotification = () => {
   const handle = () => {
      sendNotification(
         "cmatvndro0000qnqw2b89gr69",
         "Error en la carga de archivos",
         "Ocurrió un error al subir tu constancia de estudios. Intenta nuevamente.",
         "warning"
      );
   };
   return <Button onClick={() => handle()}>Send Notification</Button>;
};
export default ButtonDemoNotification;
