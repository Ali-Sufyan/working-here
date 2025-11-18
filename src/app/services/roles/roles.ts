/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { setRole } from "../../slices/branded/roles/roles.slice";
import { closeDeleteModal } from "../../slices/modal/modal.types";
import { setClickCount } from "../../slices/tableDataActions/table-data-actions.types";
import baseQueryWithTokenCheck from "../base.query";
export interface RolePayloadI {
  name: string;
  details: string;
  permissions: string[];
}
export interface RoleResponseI {
  name: string;
  details: string;
  permissions: string[];
  id: string;
  createdAt: string;
}
export const rolesApi = createApi({
  baseQuery: baseQueryWithTokenCheck,
  reducerPath: "rolesApi",
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getRoles: builder.query<RoleResponseI[], void>({
      query: () => ({
        url: "roles/roles",
      }),
      transformResponse: (response) => response.data,
    }),
    getRole: builder.query({
      query: (id) => ({
        url: `roles/roles/${id}`,
      }),
      transformResponse: (response) => response.data,
    }),
    createRole: builder.mutation<RoleResponseI, RolePayloadI>({
      query: (data) => ({
        url: "roles/roles",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    updateRole: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `roles/roles/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response,
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `roles/roles/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.data,
      async onQueryStarted(_data, { queryFulfilled, dispatch }) {
        try {
          dispatch(setClickCount(1)); // Assuming this is used for disabling the button

          const { meta } = await queryFulfilled;
          if (meta.response.status === 204) {
            toast.success("User deleted successfully");
            // dispatch(setClickCount(0)); // Re-enable the button
            // window.location.reload();
          }
          dispatch(closeDeleteModal());
        } catch (e) {
          console.log(e);
          dispatch(closeDeleteModal());
        }
      },
    }),
    getUserRole: builder.query<RoleResponseI, void>({
      query: () => ({
        url: `roles/roles/user/role`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      async onQueryStarted(_data, { queryFulfilled, dispatch }) {
        try {
          // console.log("dispatch", _data);
          
          const {data, meta } = await queryFulfilled;
          if (meta.response.status === 200) {

   
            // dispatch(setClickCount(0)); // Re-enable the button
            // window.location.reload();
            dispatch(setRole(data));
          }
        } catch (e) {
          console.log(e);
       
        }
      },
    }),
    getRoleFromUserRole: builder.mutation<RoleResponseI, string>({
      query: (id) => ({
        url: `roles/roles/role/auth`,
        method: "POST",
        body: { role: id },
      }),
      transformResponse: (response) => response.data,
      async onQueryStarted(_data, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setRole(data));
        } catch (e: any) {
          toast.error(`${e.message ?? ""}`);
        }
      },
    }),
    assignRole: builder.mutation({
      query: (data) => ({
        url: `roles/roles/assign`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
      async onQueryStarted(_data, { queryFulfilled /* dispatch */ }) {
        const { data } = await queryFulfilled;
        return data;
      },
    }),
    getRolesCount: builder.query<RoleResponseI & { userCount: number }[], void>(
      {
        query: () => ({
          url: `roles/get-user-roles-count`,
        }),
      }
    ),
  }),
});

export const {
  useAssignRoleMutation,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useGetRoleFromUserRoleMutation,
  useGetRoleQuery,
  useUpdateRoleMutation,
  useGetRolesQuery,
  useGetRolesCountQuery,
  useLazyGetUserRoleQuery,
} = rolesApi;
