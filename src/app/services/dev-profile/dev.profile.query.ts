import { setDevProfileData } from "@/app/slices/branded/dev-profile/dev.profile.slice";
import { IDeveloperProfileFull } from "@/app/slices/branded/dev-profile/dev.profile.types";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithTokenCheck from "../base.query";
import {
  ICreateDeveloperProfile,
  IDevData,
  IDeveloperProfile,
  TUpdateDeveloperProfile,
} from "./dev.profile.types";

export const devProfileApi = createApi({
  reducerPath: "devProfileApi",
  baseQuery: baseQueryWithTokenCheck,
  endpoints: (builder) => ({
    getDevProfile: builder.query<IDeveloperProfileFull, void>({
      query: () => ({ url: "/dev/profile/get" }),
      transformResponse: (response) => response.data,
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setDevProfileData(data));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getDevProfileById: builder.query<IDeveloperProfileFull, string>({
      query: (id) => ({ url: `/dev/profile/get/${id}` }),
      transformResponse: (response) => response.data,
    }),

    getAllDevProfiles: builder.query<IDeveloperProfileFull[], void>({
      query: () => ({ url: "/dev/profile/admin/get/all" }),
      transformResponse: (response) => response.data,
    }),

    createDevProfile: builder.mutation<
      IDeveloperProfile,
      ICreateDeveloperProfile
    >({
      query: (data) => ({
        url: "/dev/profile/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),

    updateDevProfileByUserId: builder.mutation<
      IDeveloperProfile,
      TUpdateDeveloperProfile
    >({
      query: (data) => ({
        url: "/dev/profile/update",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),

    updateDevProfileById: builder.mutation<
      IDeveloperProfile,
      { id: string; data: TUpdateDeveloperProfile }
    >({
      query: ({ id, data }) => ({
        url: `/dev/profile/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),

    updateDevProfileVerificationStatus: builder.mutation<
      IDeveloperProfile,
      { id: string; verificationStatus: IDeveloperProfile["verificationStatus"] }
    >({
      query: ({ id, verificationStatus }) => ({
        url: `/dev/profile/update/verification/${id}`,
        method: "PATCH",
        body: { verificationStatus },
      }),
      transformResponse: (response) => response.data,
    }),

    deleteDevProfileByUserId: builder.mutation<void, void>({
      query: () => ({
        url: `/dev/profile/delete`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
    }),

    deleteDevProfileById: builder.mutation<void, string>({
      query: (id) => ({
        url: `/dev/profile/delete/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
    }),

    createDevFullProfile: builder.mutation<string, IDevData>({
      query: (data) => ({
        url: "/dev/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetDevProfileQuery,
  useLazyGetDevProfileQuery,
  useGetDevProfileByIdQuery,
  useGetAllDevProfilesQuery,
  useCreateDevProfileMutation,
  useUpdateDevProfileByUserIdMutation,
  useUpdateDevProfileByIdMutation,
  useUpdateDevProfileVerificationStatusMutation,
  useDeleteDevProfileByUserIdMutation,
  useDeleteDevProfileByIdMutation,
  useCreateDevFullProfileMutation,
} = devProfileApi;
