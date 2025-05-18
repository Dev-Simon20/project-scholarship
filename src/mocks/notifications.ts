// mocks/notifications.ts
import { Notification } from "@/types/notificaction";
import { NotificationType } from "@prisma/client";

export const mockNotifications: Notification[] = [
   {
      id: 1,
      title: "Solicitud enviada",
      message:
         "Tu solicitud de beca fue enviada correctamente y está en revisión.",
      type: NotificationType.success,
      created_at: new Date,
      read: false,
   },
   {
      id: 2,
      title: "Documentos faltantes",
      message:
         "Faltan algunos documentos obligatorios para continuar con tu postulación.",
      type: NotificationType.warning,
      created_at: new Date,
      read: false,
   },
   {
      id: 3,
      title: "Error en la carga de archivos",
      message:
         "Ocurrió un error al subir tu constancia de estudios. Intenta nuevamente.",
      type: NotificationType.error,
      created_at: new Date,
      read: false,
   },
   {
      id: 4,
      title: "Nuevo mensaje del evaluador",
      message: "Has recibido una observación en tu expediente de beca.",
      type: NotificationType.info,
      created_at: new Date,
      read: true,
   },
   {
      id: 5,
      title: "Beca otorgada",
      message:
         "¡Felicidades! Tu beca ha sido aprobada. Revisa los detalles en tu perfil.",
      type: NotificationType.success,
      created_at: new Date,
      read: false,
   },
   {
      id: 6,
      title: "Plazo de inscripción próximo a vencer",
      message: "Tienes hasta mañana para completar tu inscripción a la beca.",
      type: NotificationType.warning,
      created_at: new Date,
      read: true,
   },
];
