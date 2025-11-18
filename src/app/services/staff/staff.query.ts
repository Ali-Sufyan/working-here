import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { closeDeleteModal } from "../../slices/modal/modal.types";
import { setClickCount } from "../../slices/tableDataActions/table-data-actions.types";
import baseQueryWithTokenCheck from "../base.query";
import { StaffPayloadI, StaffResponseI } from "./staff.types";

export const staffApi = createApi({
  baseQuery: baseQueryWithTokenCheck,
  reducerPath: "staffApi",
  endpoints: (builder) => ({
    getStaff: builder.query<StaffResponseI[], void>({
      query: () => ({
        url: "/staffs?page=1&limit=20",

      }),
      transformResponse: (response) => response.data,
    }),
    getStaffById: builder.query<StaffResponseI, string>({
      query: (id) => ({
        url: `/staffs/${id}`,
      }),
      transformResponse: (response) => response.data,
    }),
    getStaffByUser: builder.query<StaffResponseI, string>({
      query: (id) => ({
        url: `/staffs/${id}/user`,
      }),
      transformResponse: (response) => response.data,
    }),
    getStaffByBranchId: builder.query<StaffResponseI, string>({
      query: (id) => ({
        url: `/staffs/${id}/branch`,
      }),
      transformResponse: (response) => response.data,
    }),
    updateStaff: builder.mutation<
      StaffResponseI,
      StaffPayloadI & { id: string }
    >({
      query: ({ id, ...data }) => {
    
        return {
          url: `/staffs/${id}`,
          method: "PATCH",
          body: data,
        };
      },

    }),
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/staffs/${id}`,
        method: "DELETE",
      }),
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
    createStaff: builder.mutation<StaffResponseI[], StaffPayloadI>({
      query: (data) => ({
        url: `/staffs`,
        method: "POST",
        body: data,
      }),
    }),
    assignUserAsStaff: builder.mutation<StaffResponseI[], StaffPayloadI>({
      query: (data) => ({
        url: `staffs/assign/user-as-staff`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    getStaffByUserId: builder.query<StaffResponseI, void>({
      query: () => ({
        url: `/staffs/user/data`,
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
    updateStaffByUserId: builder.mutation({
      query: (data) => ({
        url: `/staffs/user/data`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetStaffQuery,
  useGetStaffByIdQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useCreateStaffMutation,
  useGetStaffByUserIdQuery,
  useGetStaffByUserQuery,
  useLazyGetStaffByBranchIdQuery,
  useUpdateStaffByUserIdMutation,
  useAssignUserAsStaffMutation,
} = staffApi;
