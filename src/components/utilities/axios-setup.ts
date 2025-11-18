/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/app/config";
import axios from "axios";
import dayjs from "dayjs";
import { getLocalAuthData } from "./utils";

export function axiosSetup ({ authRoute=true, baseURL=BASE_URL}:{baseURL?: string, authRoute?: boolean}) {
  const axiosInstance = axios.create({
    baseURL: baseURL,withCredentials: true, 
  });

  const interceptors = axiosInstance.interceptors;

  interceptors.request.use(
    async (config) => {
      config.headers["Content-Type"] = "application/json";

      if (authRoute) {
        const { token, expireTime } = getLocalAuthData();

        

        if (dayjs.unix(Number(expireTime)).isBefore(dayjs())) {
          console.log("Token expired");
          // Token is expired, redirect to login
          window.location.href = "/logout";
          return Promise.reject("Token expired");
        }

        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Handle 401 responses
  interceptors.response.use(
    (response) => response,
    (error) => {
      // if (error.response && error.response.status === 401) {
      //   // Unauthorized, redirect to login
      //   window.location.href = "/login";
      // }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export async function fetchSetup(baseURL: string, authRoute: boolean) {
  async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const { headers = {}, ...restOptions } = options;
    const finalHeaders: Record<string, any> = {
      ...headers,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*",
    };

    if (authRoute) {
      const { token } = getLocalAuthData();

      // if (dayjs().isAfter(dayjs(expireTime))) {
      //   // Token is expired, redirect to login
      //   window.location.href = "/login";
      //   throw new Error("Token expired");
      // }

      finalHeaders["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${baseURL}${url}`, {
      ...restOptions,
      headers: finalHeaders,
    });

    // if (response.status === 401) {
    //   // Unauthorized, redirect to login
    //   window.location.href = "/login";
    //   throw new Error("Unauthorized");
    // }

    return response;
  }

  return fetchWithAuth;
}
