import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  EXPIRE_KEY,
  IS_EMAIL_SENT,
  LOGIN_USER_KEY,
  REFRESH_EXPIRE_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_KEY,
} from "../../../../config";
import { UserI } from "../../user/user.types";
import { AuthI, AuthPayloadI } from "../auth-types/auth.types";

const user = localStorage.getItem(LOGIN_USER_KEY) ?? "";

const token = localStorage.getItem(TOKEN_KEY);
const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
const tokenExpireTime = localStorage.getItem(EXPIRE_KEY);
const refreshTokenExpireTime = localStorage.getItem(REFRESH_EXPIRE_KEY);
const initialState: AuthI = {
  refreshToken: refreshToken ?? "",
  token: token ?? "",
  user: user ? JSON.parse(user) : undefined,
  refreshTokenExpireTime: refreshTokenExpireTime ?? new Date().toISOString(),
  tokenExpireTime: tokenExpireTime ?? new Date().toISOString(),
  isEmailSent: false,
};

const emptyState: AuthI = {
  refreshToken: "",
  token: "",
  user: undefined,
  refreshTokenExpireTime: "",
  tokenExpireTime: "",
  isEmailSent: false,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuthData(state, { payload }: PayloadAction<AuthPayloadI>) {
      const { tokens, user } = payload;

      // const { token, refreshToken, refreshTokenExpireTime } = tokens;

      state.user = { ...state.user, ...user };
      state.token = tokens.access.token;
      state.refreshToken = tokens.refresh.token;
      state.tokenExpireTime = tokens.access.expires;
      state.refreshTokenExpireTime = tokens.refresh.expires;

      localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, tokens.access.token);
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh.token);
      localStorage.setItem(EXPIRE_KEY, tokens.access.expires);
      localStorage.setItem(REFRESH_EXPIRE_KEY, tokens.refresh.expires);
    },
    setUserData (state, { payload }: PayloadAction<UserI>) { 
      state.user = payload;
      localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(payload));
    },
    
    updateLoggedInUser(state, { payload }: PayloadAction<Partial<UserI>>) {
      const obj = { ...state.user, ...payload };
      for (const [key, value] of Object.entries(obj)) {
        if (key && value === undefined) {
      
          delete obj[key as keyof UserI];
        }
      }
      state.user = obj;
    },
    updateToken(state, { payload }: PayloadAction<AuthPayloadI>) {
      const { tokens } = payload;
      const { access, refresh } = tokens;

      state.tokenExpireTime = access.expires;
      state.token = access.token;
      state.refreshToken = refresh.token;
      state.refreshTokenExpireTime = refresh.expires;
      localStorage.setItem(TOKEN_KEY, access.token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh.token);
      localStorage.setItem(EXPIRE_KEY, access.expires);
      localStorage.setItem(REFRESH_EXPIRE_KEY, refresh.expires);
    },
    resetAuthData() {
      localStorage.removeItem(LOGIN_USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(EXPIRE_KEY);
      return emptyState;
      //       return {
      //         ...state,
      //         user: undefined,
      //         token: "",
      //         refreshToken: "",
      //         tokenExpireTime: 0,
      //         refreshTokenExpireTime: 0,
      //       };
      //
    },
    isEmailSent(state, { payload }: PayloadAction<boolean>) {
      state.isEmailSent = payload;
      localStorage.setItem(IS_EMAIL_SENT, payload.toString());
    },
    setAccessData (state, { payload }: PayloadAction<{ accessToken: string; exp: number }>) {
    

      localStorage.setItem(TOKEN_KEY, payload.accessToken);
      localStorage.setItem(EXPIRE_KEY, String(payload.exp));
    
      state.token = payload.accessToken;
      state.tokenExpireTime = String(payload.exp);}
      
  },
});

export const {
  setAuthData,
  updateLoggedInUser,
  updateToken,
  resetAuthData,
  isEmailSent,
  setUserData,
  setAccessData
} = AuthSlice.actions;

export const authReducer = AuthSlice.reducer;
