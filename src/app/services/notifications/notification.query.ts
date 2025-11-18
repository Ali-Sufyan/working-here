import { setNotification } from "@/app/slices/notification/slice.notification";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithTokenCheck from "../base.query";
import { INotification, INotificationPayload } from "./notification.types";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithTokenCheck,
  endpoints: (builder) => ({
    getAllNotifications: builder.query<INotification[], void>({
      query: () => ({ url: "/notification/" }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getAllUsersNotification: builder.query<INotification[], void>({
      query: () => ({ url: "/notification/user" }),
      transformResponse: (response) => {
        return response.data;
      },
      onQueryStarted: async (_args, { queryFulfilled, dispatch }) => {
        //console.log("onQueryStarted");
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setNotification(data));
            // call the getNotification query to update the notification state
          }
        } catch (e) {
          console.log(e);
        }
      },
    }),

    getNotification: builder.query<INotification, string>({
      query: (userId) => ({ url: `/notification/get-notifications/${userId}` }),
      transformResponse: (response) => {
        return response.data;
      },
    }),

    viewNotification: builder.mutation<INotification, string>({
      query: (notificationId) => ({
        url: `/notification/view-notification/${notificationId}`,
        method: "POST",
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        //console.log("onQueryStarted");
        try {
          const { data } = await queryFulfilled;
          if (data) {
            const res = await dispatch(
              notificationApi.endpoints.getAllUsersNotification.initiate()
            );
            if (res.data) {
              dispatch(setNotification(res.data));
            }

            // call the getNotification query to update the notification state
          }
        } catch (e) {
          console.log(e);
        }
      },
      transformResponse: (response) => {
        //console.log(response.data);
        return response.data;
      },
    }),

    getUserNotificationById: builder.query<INotification, string>({
      query: (id) => ({ url: `/notification/user/${id}` }),
    }),
   
    getNotificationById: builder.query<INotification, string>({
      query: (id) => ({ url: `/notification/get-not/${id}` }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
   
    sendNotification: builder.mutation<INotificationPayload, INotification>({
      query: (data) => ({
        url: `notification/send-notification/userId`,
        method: "POST",

        body: data,
      }),
      transformResponse: (response) => {
        //console.log(response);
        return response;
      },
    }),
    sendNotificationViaEmail: builder.mutation<
      INotificationPayload,
      Omit<INotification, "userId"> & { userEmail: string }
    >({
      query: (data) => {
        //console.log(data, "data in reduxjs");
        return {
          url: `/notification/send-notification/email`,
          method: "POST",

          body: data,
        };
      },
      transformResponse: (response) => {
        //console.log(response);
        return response;
      },
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useLazyGetAllUsersNotificationQuery,
  useGetAllUsersNotificationQuery,
  useViewNotificationMutation,
  useSendNotificationMutation,
  useSendNotificationViaEmailMutation,
  useGetNotificationByIdQuery,
} = notificationApi;
