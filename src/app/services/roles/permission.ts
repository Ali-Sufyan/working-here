import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithTokenCheck from "../base.query";

interface RolesI {
  name: string;
  details: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
export const permissionApi = createApi({
  baseQuery: baseQueryWithTokenCheck,
  keepUnusedDataFor: 30,
  reducerPath: "permissionApi",
  tagTypes: ["Permission"],
  endpoints: (builder) => ({
    getPermissions: builder.query<RolesI[], void>({
      query: () => ({
        url: "/permissions/?limit=500",
      }),
      transformResponse: (response) => response.data,
    }),
    getPermission: builder.query({
      query: (id) => ({
        url: `/permissions/${id}`,
      }),
    }),
  }),
});

export const { useGetPermissionQuery, useGetPermissionsQuery } = permissionApi;
