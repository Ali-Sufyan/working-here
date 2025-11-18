/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { closeDeleteModal } from "../../slices/modal/modal.types";
import { setClickCount } from "../../slices/tableDataActions/table-data-actions.types";
import baseQueryWithTokenCheck from "../base.query";
import {
  IAdClick,
  IAdImpression,
  IAdPlacementDoc
} from "./types"; // Adjust the import path as needed

export const adsApi = createApi({
  baseQuery: baseQueryWithTokenCheck,
  reducerPath: "adsApi",
  endpoints: (builder) => ({
    // Get Ad Placement by ID
    getAdPlacementById: builder.query<IAdPlacementDoc, string>({
      query: (id) => ({
        url: `/ads/get/${id}`,
      }),
      transformResponse: (response) => response.data,
    }),

    // Get All Ad Placements
    getAllAdPlacements: builder.query<IAdPlacementDoc[], void>({
      query: () => ({
        url: "/ads/get",
      }),
      transformResponse: (response) => response.data,
    }),

    // Create Ad Placement
    createAdPlacement: builder.mutation<IAdPlacementDoc, FormData>({
      query: (data) => ({
        url: "/ads/create",
        method: "POST",
        body: data,
        useFormData: true,
      }),
    }),

    // Update Ad Placement
    updateAdPlacement: builder.mutation<
      IAdPlacementDoc,
      {data:FormData, id:string}
    >({
      query: (
        {data, id}
      ) => ({
        url: `/ads/update/${id}`,
        method: "PATCH",
        body: data,
        useFormData: true,
      }),
    }),

    // Delete Ad Placement
    deleteAdPlacement: builder.mutation<void, string>({
      query: (id) => ({
        url: `/ads/delete/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_data, { queryFulfilled, dispatch }) {
        try {
          dispatch(setClickCount(1)); // Disable the button
          await queryFulfilled;
          toast.success("Ad Placement deleted successfully");
          dispatch(closeDeleteModal());
        } catch (e) {
          console.error(e);
          dispatch(closeDeleteModal());
        }
      },
    }),

    // Disable Ad Placement
    disableAdPlacement: builder.mutation<IAdPlacementDoc, string>({
      query: (id) => ({
        url: `/ads/disable/${id}`,
        method: "PATCH",
      }),
    }),

    // Enable Ad Placement
    enableAdPlacement: builder.mutation<IAdPlacementDoc, string>({
      query: (id) => ({
        url: `/ads/enable/${id}`,
        method: "PATCH",
      }),
    }),

    // Get Ad Analytics by ID
    getAdAnalytics: builder.query<any, string>({
      query: (id) => ({
        url: `/ads/analytics/${id}`,
      }),
      transformResponse: (response) => response.data,
    }),

    // Track Ad Impression
    trackAdImpression: builder.mutation<IAdImpression, Partial<IAdImpression>>({
      query: (data) => ({
        url: "/ads/impression",
        method: "POST",
        body: data,
      }),
    }),

    // Track Ad Click
    trackAdClick: builder.mutation<IAdClick, Partial<IAdClick>>({
      query: (data) => ({
        url: "/ads/click",
        method: "POST",
        body: data,
      }),
    }),

    // Complete Ad Placement by ID
    completeAdPlacement: builder.mutation<IAdPlacementDoc, string>({
      query: (id) => ({
        url: `/ads/complete/${id}`,
        method: "POST",
      }),
    }),

    // Create Ad Impression
    createAdImpression: builder.mutation<IAdImpression, Partial<IAdImpression>>(
      {
        query: (data) => ({
          url: "/ads/impression/create",
          method: "POST",
          body: data,
        }),
      }
    ),

    // Get Impressions by Ad ID
    getImpressionsByAdId: builder.query<IAdImpression[], string>({
      query: (adId) => ({
        url: `/ads/impressions/ad/${adId}`,
      }),
      transformResponse: (response) => response.data,
    }),

    // Get Impressions by User ID and Ad ID
    getImpressionsByUserIdAndAdId: builder.query<
      IAdImpression[],
      { userId: string; adId: string }
    >({
      query: ({ userId, adId }) => ({
        url: `/ads/impressions/user/${userId}/ad/${adId}`,
      }),
      transformResponse: (response) => response.data,
    }),

    // Get Impressions in Time Range
    getImpressionsInTimeRange: builder.query<
      IAdImpression[],
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) => ({
        url: `/ads/impressions/time-range?startDate=${startDate}&endDate=${endDate}`,
      }),
      transformResponse: (response) => response.data,
    }),

    // Count Ad Impressions by Ad ID
    countAdImpressions: builder.query<number, string>({
      query: (adId) => ({
        url: `/ads/impressions/count/${adId}`,
      }),
      transformResponse: (response) => response.data,
    }),

    // Delete Impressions by User ID and Ad ID
    deleteImpressionsByUserIdAndAdId: builder.mutation<
      void,
      { userId: string; adId: string }
    >({
      query: ({ userId, adId }) => ({
        url: `/ads/delete/${userId}/${adId}`,
        method: "DELETE",
      }),
    }),

    // Create Ad Click
    createAdClick: builder.mutation<IAdClick, Partial<IAdClick>>({
      query: (data) => ({
        url: "/ads/click/create",
        method: "POST",
        body: data,
      }),
    }),

    // Get Clicks by Ad ID
    getClicksByAdId: builder.query<IAdClick[], string>({
      query: (adId) => ({
        url: `/ads/click/get/${adId}`,
      }),
      transformResponse: (response) => response.data,
    }),

    // Get Clicks by User ID and Ad ID
    getClicksByUserIdAndAdId: builder.query<
      IAdClick[],
      { userId: string; adId: string }
    >({
      query: ({ userId, adId }) => ({
        url: `/ads/click/get/${userId}/${adId}`,
      }),
      transformResponse: (response) => response.data,
    }),

    // Get Clicks within a Time Range
    getClicksInTimeRange: builder.query<
      IAdClick[],
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) => ({
        url: `/ads/click/get/time-range?startDate=${startDate}&endDate=${endDate}`,
      }),
      transformResponse: (response) => response.data,
    }),

    // Count Clicks by Ad ID
    countAdClicks: builder.query<number, string>({
      query: (adId) => ({
        url: `/ads/click/count/${adId}`,
      }),
      transformResponse: (response) => response.data,
    }),

    // Delete Clicks by Ad ID
    deleteClicksByAdId: builder.mutation<void, string>({
      query: (adId) => ({
        url: `/ads/click/delete/${adId}`,
        method: "DELETE",
      }),
    }),

    // Delete Clicks by User ID and Ad ID
    deleteClicksByUserIdAndAdId: builder.mutation<
      void,
      { userId: string; adId: string }
    >({
      query: ({ userId, adId }) => ({
        url: `/ads/click/delete/${userId}/${adId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetAdPlacementByIdQuery,
  useGetAllAdPlacementsQuery,
  useCreateAdPlacementMutation,
  useUpdateAdPlacementMutation,
  useDeleteAdPlacementMutation,
  useDisableAdPlacementMutation,
  useEnableAdPlacementMutation,
  useGetAdAnalyticsQuery,
  useTrackAdImpressionMutation,
  useTrackAdClickMutation,
  useCompleteAdPlacementMutation,
  useCreateAdImpressionMutation,
  useGetImpressionsByAdIdQuery,
  useGetImpressionsByUserIdAndAdIdQuery,
  useGetImpressionsInTimeRangeQuery,
  useCountAdImpressionsQuery,
  useDeleteImpressionsByUserIdAndAdIdMutation,
  useCreateAdClickMutation,
  useGetClicksByAdIdQuery,
  useGetClicksByUserIdAndAdIdQuery,
  useGetClicksInTimeRangeQuery,
  useCountAdClicksQuery,
  useDeleteClicksByAdIdMutation,
  useDeleteClicksByUserIdAndAdIdMutation,
} = adsApi;
