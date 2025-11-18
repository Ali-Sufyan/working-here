import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { SocketClient } from "../../../components/utilities/websocket";
import { closeDeleteModal } from "../../slices/modal/modal.types";
import baseQueryWithTokenCheck from "../base.query";
import {
  AddStaffToChatPayload,
  ChatI,
  CreateChatPayload,
  CreateMessagePayload,
  GetAllChatsQuery,
  MessagesI,
  TransferChatPayload,
} from "./query";

export const chatApi = createApi({
  baseQuery: baseQueryWithTokenCheck,
  reducerPath: "chatApi",
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    createChat: builder.mutation<ChatI, CreateChatPayload>({
      query: (data) => ({
        url: "/chats",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),

    getChatById: builder.query<ChatI, string>({
      query: (id) =>{
        //console.log(`id: chatId ${id}`)
        return ({
        url: `/chats/${id}`,
      })},
      transformResponse: (response) => response.data,
    }),

    deleteChatById: builder.mutation<ChatI, string>({
      query: (id) => ({
        url: `/chats/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      async onQueryStarted(_data, { queryFulfilled, dispatch }) {
        try {
          const { meta } = await queryFulfilled;
          if (meta.response.status === 204) {
            toast.success("Chat deleted successfully");
          }
          dispatch(closeDeleteModal());
        } catch (e) {
          //console.log(e);
          dispatch(closeDeleteModal());
        }
      },
    }),

    getAllChats: builder.query<ChatI[], GetAllChatsQuery>({
      query: () => ({
        url: "/chats",
      }),
      transformResponse: (response) => response.data,
    }),

    createMessage: builder.mutation<MessagesI, CreateMessagePayload>({
      query: ({ chatId, message }) => ({
        url: `/chats/${chatId}/messages`,
        method: "POST",
        body: { message },
      }),
      transformResponse: (response) => response.data,
    }),
    getMessagesByChatId: builder.query<MessagesI[], string>({
      query: ( chatId ) => ({
        url: `/chats/${chatId}/messages`,
        method: "GET",
      
      }),
      transformResponse: (response) => response.data,
    }),

    getMessageById: builder.query<MessagesI, string>({
      query: (id) => ({
        url: `/chats/messages/${id}`,
      }),
      transformResponse: (response) => response.data,
    }),

    deleteMessageById: builder.mutation<MessagesI, string>({
      query: (id) => ({
        url: `/chats/messages/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
    }),

    transferChat: builder.mutation<ChatI, TransferChatPayload>({
      query: ({ chatId, ...data }) => {
   
        
        return ({
        url: `/chats/${chatId}/transfer`,
        method: "PATCH",
        body: data,
      })},
      transformResponse: (response) => response.data,
    }),

    addStaffToChat: builder.mutation<ChatI, AddStaffToChatPayload>({
      query: ({ staffId, chatId }) => ({
        url: `/chats/${chatId}/staff`,
        method: "PATCH",
        body: { staffId,chatId },
      }),
      transformResponse: (response) => response.data,
    }),

    closeChat: builder.mutation<ChatI, string>({
      query: (id) => ({
        url: `/chats/${id}/close`,
        method: "PATCH",
      }),
      transformResponse: (response) => response.data,
    }),
    getMessages: builder.query<MessagesI[], string>({
      query: (channel) => `messages/${channel}`,
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new SocketClient()
   
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data)
       

            updateCachedData((draft) => {
              draft.push(data)
            })
          }

          ws.on('message', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.disconnect()
      },
    }),
  }),
});

export const {
  useCreateChatMutation,
  useGetChatByIdQuery,
  useDeleteChatByIdMutation,
  useGetAllChatsQuery,
  useCreateMessageMutation,
  useGetMessageByIdQuery,
  useDeleteMessageByIdMutation,
  useTransferChatMutation,
  useAddStaffToChatMutation,
  useCloseChatMutation,
  useGetMessagesByChatIdQuery
} = chatApi;

// Typings
