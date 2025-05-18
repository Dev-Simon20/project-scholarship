// types/notification.d.ts

import { NotificationType } from "@prisma/client";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  created_at: Date;
  read: boolean;
}
