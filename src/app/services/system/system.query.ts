import { createApi } from "@reduxjs/toolkit/query/react";
import { updateSystem } from "../../slices/branded/system/system.slice";
import { systemI } from "../../slices/branded/system/system.types";
import baseQueryWithTokenCheck from "../base.query";

export const systemApi = createApi({
  reducerPath: "systemApi",
  baseQuery: baseQueryWithTokenCheck,
  endpoints: (builder) => ({
    getSystemConfig: builder.query<systemI, void>({
      query: () => ({
        url: "/system/",
      }),
      transformResponse(response) {
        // //console.log(response.data[0]);
        return response.data[0];
      },
      async onQueryStarted(_data, { dispatch, queryFulfilled }) {
        try {
          const { data: dat } = await queryFulfilled;

          dispatch(updateSystem(dat));
        } catch (e) {
          //console.log(e);
        }
      },
    }),
    createSystemConfig: builder.mutation<systemI, systemI>({
      query: (data) => ({
        url: "/system/",
        body: data,
        method: "POST",
      }),
      transformResponse(response) {
        return response.data;
      },
      async onQueryStarted(_data, { dispatch, queryFulfilled }) {
        try {
          const { data: dat } = await queryFulfilled;
          dispatch(updateSystem(dat));
        } catch (e) {
          //console.log(e);
        }
      },
    }),
  }),
});

export const {
  useCreateSystemConfigMutation,
  useLazyGetSystemConfigQuery,
  useGetSystemConfigQuery,
} = systemApi;
