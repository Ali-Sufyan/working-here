export interface CreateChatPayload {
  title: string;
  message: string;
}

export interface GetAllChatsQuery {
  ref?: string;
  title?: string;
  userId?: string;
  isClosed?: boolean;
}

export interface CreateMessagePayload {
  chatId: string;
  message: string;
  
}

export interface TransferChatPayload {
  chatId: string;
  handledBy: string;
  transferredTo: string;
  // Other properties for transferring chat as defined in StaffChatT export interface
}

export interface AddStaffToChatPayload {
  staffId: string;
  chatId: string;
}

export interface MessageResponse {}

export type StaffChatT = {
  handledBy: string;
  transferredTo?: string;
  transferredBy?: string;
  date?: string;
};

export interface ChatI {
  id: string;
  _id: string;
  ref?: string;
  title: string;

  userId: string;
  isClosed?: boolean;

  staff?: StaffChatT[];
}

export interface MessagesI {
  chatId: string;
  senderId: string;
  isRead: boolean;
  createdAt:string
  updatedAt:string

  message: string;
}
