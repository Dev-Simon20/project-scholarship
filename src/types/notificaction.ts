// types/notification.d.ts
export enum NotificationType { success , error, info, warning};

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  read: boolean;
}
