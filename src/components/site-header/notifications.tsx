"use client";
import { AlertTriangle, Bell, Check, Info, X } from "lucide-react";
import { Button } from "../ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { mockNotifications } from "@/mocks/notifications";
import { Notification } from "@/types/notificaction";
import { getAllNotifications } from "@/actions/notifications/getAll";
import { NotificationType } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { deleteNotification } from "@/actions/notifications/delete";

const getIcon = (type: NotificationType) => {
   switch (type) {
      case NotificationType.success:
         return <Check className="h-4 w-4 text-green-500" />;
      case NotificationType.error:
         return <X className="h-4 w-4 text-red-500" />;
      case NotificationType.info:
         return <Info className="h-4 w-4 text-blue-500" />;
      case NotificationType.warning:
         return <AlertTriangle className="h-4 w-4 text-amber-500" />;
   }
};

const Notifications = ({ id }: { id: string }) => {
   const [notifications, setNotifications] = useState<Notification[]>([]);

   const unreadCount = notifications.filter((n) => !n.read).length;

   const markAsRead = (id: number) => {
      setNotifications(
         notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
   };

   const markAllAsRead = () => {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
   };

   const removeNotification = async (id: number) => {
      setNotifications(notifications.filter((n) => n.id !== id));
      await deleteNotification(id)

   };

   const fetchNotifications = async () => {
      const res = await getAllNotifications();
      if ("error" in res) {
         console.error("Error al obtener las notificaciones", res.error);
      } else {
         setNotifications(res);
      }
   };

   useEffect(() => {
      fetchNotifications();
      pusherClient.subscribe(`private-user-${id}`);
      pusherClient.bind("new-notification", (noti: { noti: Notification }) => {
         setNotifications((prev) => [noti.noti, ...prev]);
      });
      return () => pusherClient.unsubscribe(`private-user-${id}`);
   }, []);

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="flex items-center gap-1" asChild>
            <Button
               variant={"outline"}
               size={"icon"}
               className="rounded-full relative"
            >
               <Bell />
               {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white">
                     {unreadCount}
                  </Badge>
               )}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent
            align="end"
            className="max-h-[400px] overflow-y-auto p-0 w-96"
         >
            <div className="flex flex-row items-center justify-between p-3">
               <p className="text-sm font-medium">Notificaciones</p>
               {unreadCount > 0 && (
                  <Button
                     variant="ghost"
                     size="sm"
                     className="h-8 text-xs"
                     onClick={markAllAsRead}
                  >
                     Marcar todas como leídas
                  </Button>
               )}
            </div>
            {notifications.length > 0 ? (
               <div className="divide-y">
                  {notifications.map((notification) => (
                     <div
                        key={notification.id}
                        className={cn(
                           "flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors",
                           !notification.read && "bg-muted/30"
                        )}
                     >
                        <div className="mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1 space-y-1">
                           <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                 {notification.title}
                              </p>
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 className="h-6 w-6"
                                 onClick={() =>
                                    removeNotification(notification.id)
                                 }
                              >
                                 <X className="h-3 w-3" />
                                 <span className="sr-only">Cerrar</span>
                              </Button>
                           </div>
                           <p className="text-xs text-muted-foreground">
                              {notification.message}
                           </p>
                           <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground">
                                 {formatDistanceToNow(notification.created_at, {
                                    addSuffix: true,
                                    locale: es,
                                 })}
                              </p>
                              {!notification.read && (
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-xs"
                                    onClick={() => markAsRead(notification.id)}
                                 >
                                    Marcar como leída
                                 </Button>
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <p className="py-6 text-center text-sm text-muted-foreground">
                  No tienes notificaciones
               </p>
            )}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
export default Notifications;
