
import { errorToast, successToast } from "@/components/utilities/toaster";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithTokenCheck from "../base.query"; // Handles base API setup with token management
import {
  SubscriptionPayloadI,
  SubscriptionResponseI,
} from "./types";

export const subscriptionApi = createApi({
  baseQuery: baseQueryWithTokenCheck,
  reducerPath: "subscriptionApi",
  endpoints: (builder) => ({
    // Fetch all subscription
    getSubscription: builder.query<SubscriptionResponseI[], void>({
      query: () => ({
        url: "/subscription/get",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),

    // Fetch subscription by ID
    getSubscriptionById: builder.query<SubscriptionResponseI, string>({
      query: (id) => ({
        url: `/subscription/get/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),

    // Create a new subscription
    createSubscription: builder.mutation<
      SubscriptionResponseI,
      SubscriptionPayloadI
    >({
      query: (data) => ({
        url: "/subscription/create",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_data, { queryFulfilled }) {
        try {
          await queryFulfilled;
          successToast("Subscription created successfully");
        } catch (error) {
            console.log(error)
          errorToast("Failed to create subscription");
        }
      },
    }),

    // Update a subscription by ID
    updateSubscription: builder.mutation<
      SubscriptionResponseI,
      SubscriptionPayloadI & { id: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/subscription/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_data, { queryFulfilled }) {
        try {
          await queryFulfilled;
          successToast("Subscription updated successfully");
        } catch (error) {
            console.log(error)
          errorToast("Failed to update subscription");
        }
      },
    }),

    // Delete a subscription by ID
    deleteSubscription: builder.mutation<void, string>({
      query: (id) => ({
        url: `/subscription/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          successToast("Subscription deleted successfully");
        } catch (error) {
            console.log(error)
          errorToast("Failed to delete subscription");
        }
      },
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useGetSubscriptionByIdQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
