export interface INotificationPayload {
  userId: string; // Assuming userId is a string here
  nType: string;
  body: string;
  title: string;
  type: string;
}

export interface INotification {
  id: string;
  createdAt: string;
  userId: string; // Assuming userId is a string here

  title: string;
  body: string;
  viewed: boolean;
  type: string;
}
