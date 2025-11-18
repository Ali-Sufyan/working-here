/* eslint-disable @typescript-eslint/no-explicit-any */
import { errorToast } from "@/components/utilities/toaster";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import dayjs from "dayjs";
import {
  getLocalAuthData,
  setRedirectUrl,
} from "../../components/utilities/utils";
import { BASE_URL, tokenHeader } from "../config";
import {
  resetAuthData
} from "../slices/branded/auth/auth-slices/auth.slice";

// import BASE_URL, { tokenHeader } from "../config";
// import { resetAuthData, updateToken } from "../slices/auth.data";

export const whiteList = [
  "login",
  
  "refresh",
  
];
const whiteList401 = ["login", "refresh", "verify", "loginStaff"];
const errorWhiteList = ["preCheckFileFromUrl", "getFavoriteDetails"];



const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { endpoint }) => {
    const { token } = getLocalAuthData();
    // const { token } = (getState() as RootState).authData;

    if (token && !whiteList.includes(endpoint)) {
      headers.set(tokenHeader, `bearer ${token}`);
    }
    return headers;
  },
});

setRedirectUrl(window.location.pathname);





const baseQueryWithTokenCheck = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  
  

  const {  expireTime } = getLocalAuthData();

  let result:any = null;

  if (whiteList.includes(api.endpoint) && dayjs().isAfter(dayjs(expireTime)) ) {
        // location.href = "/login";

    
  
  } else {
    result = await baseQuery(args, api, extraOptions);
  }
  if (result?.error) {
    console.error("api error", result.error, args, api.endpoint);
    if (errorWhiteList.includes(api.endpoint)) return result;
    switch (result.error?.originalStatus || result.error?.status) {
      case "FETCH_ERROR":
        {
          errorToast(`${api.endpoint}: Failed to fetch`);
        }
        break;
      case 400:{
        //console.log(result?.error?.data, "bad request");


let message = "Bad Request";
  if (typeof result.error?.data ==='string') {
            message = result.error.data;

          }
          if (typeof result.error?.data ==='object' && typeof  result.error?.data?.message==='string') {
            message = result.error.data.message;
          }
          // errorToast(message);
        





        errorToast(message);
        return result;
      
      }
      case 401:
        {
          if (whiteList401.includes(api.endpoint)) {
            errorToast("un authorized access");
            return;
          }
          if (api.endpoint !== "login" ) {
            // console.log('inside unauthorized,', api.endpoint, result);
            setRedirectUrl(window.location.pathname);
            // api.dispatch(resetAuthData());
            // location.href = "/logout";
            errorToast("API Not Authenticated");
          }
          return result
        }
      case 403:
        {
          const whiteList403 = ["sendMsg"];
          if (!whiteList403.includes(api.endpoint)) {
            // errorToast("Request Not Allowed");
          }
        }

        break;
      case 404:
        {
          const whiteList404 = [
            "login",
            "loginStaff",
            "getArchiveMessage",
            "preCheckFileFromUrl",
            "deleteMessage",
            "deleteMessages",
          ];
          if (!whiteList404.includes(api.endpoint)) {
            errorToast("Request Not Found");
          }
        break;

        }
      case 413:
        {
          errorToast("File size too large");
        break;

        }
      case 451:
        {
          // 证书错误
          if (api.endpoint !== "login" || api.endpoint !== "loginStaff") {
            // 退出登录
            api.dispatch(resetAuthData());
            // setRedirectUrl(window.location.pathname);
            // location.href = "/login";
          }
          errorToast(result?.error?.data || "License Error");
            return result;
        }
      case 500:
      case 503:
        {
          let message = "Server Error";
          if (typeof result.error?.data ==='string') {
            message = result.error.data;

          }
          if (typeof result.error?.data ==='object' && typeof  result.error?.data?.message==='string') {
            message = result.error.data.message;
          }
          errorToast(message);
          return result;
        }

      default:
        return result;
      
    }
  }
  return result;
};

export default baseQueryWithTokenCheck;
