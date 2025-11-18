/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "@/app/slices/branded/dev-profile/dev.profile.types";
import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { getLocalAuthData } from "../../../components/utilities/utils";
import {
  setAuthData
} from "../../slices/branded/auth/auth-slices/auth.slice";
import {
  AuthPayloadI,
  LoginDataI,
  RefreshTokenI,
  RegisterDataI,
  forgotPasswordI
} from "../../slices/branded/auth/auth-types/auth.types";
import baseQueryWithTokenCheck from "../base.query";

export const authApi = createApi({
  baseQuery: baseQueryWithTokenCheck,
  reducerPath: "authApi",

  endpoints: (builder) => ({
    login: builder.mutation<AuthPayloadI, LoginDataI>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response,

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) dispatch(setAuthData(data));
          // localStorage.setItem("token", data.token);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    register: builder.mutation<AuthPayloadI, RegisterDataI>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response,

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data) dispatch(setAuthData(data));
          // localStorage.setItem("token", data.token);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    checkIfEmailExists: builder.mutation<IUser, { email: string }>({
      query: (data) => ({
        url: `/auth/check-email-existence`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        body: {
          refreshToken: getLocalAuthData().refreshToken,
        },
      }),
      transformResponse: (response) => {
        return response;
      },

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data)
            dispatch(
              setAuthData({
                ...data,
                refreshToken: data.refresh,
                token: data.access,
              })
            );
          // localStorage.setItem("token", data.token);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loginStaff: builder.mutation<AuthPayloadI, LoginDataI>({
      query: (data) => ({
        // url: "/staffs/staff/login",
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response,

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) dispatch(setAuthData(data));
          // localStorage.setItem("token", data.token);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.mutation<AuthPayloadI, RefreshTokenI>({
      query: (data) => ({
        url: "/auth/refresh-tokens",
        method: "POST",
        data,
      }),
      transformResponse: (response) => response.data,

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data)
            dispatch(
              setAuthData({
                ...data,
              })
            );
          // localStorage.setItem("token", data.token);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    forgotPassword: builder.mutation<null, forgotPasswordI>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data,
      }),
      transformResponse: (response) => response.data,

      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) toast.success("Email sent");
          // dispatch(
          //   setAuthData({
          //     ...data,
          //   })
          // );
          // localStorage.setItem("token", data.token);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    testAuth0: builder.query<any, void>({
      query: () => ({
        url: "/auth/test-auth",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useRegisterMutation,
  useLazyTestAuth0Query,
  useCheckIfEmailExistsMutation
 
  
} = authApi;
