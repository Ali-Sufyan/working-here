/* eslint-disable @typescript-eslint/no-explicit-any */
import { colorScheme } from "@/components/utilities/color-scheme";
import { TableDataT } from "andrea-table";

//const official_dev = `https://rload-backend.onrender.com`;
const official_dev = `https://test-backend-lsea.onrender.com`;

//const local_dev = `https://rload-backend.onrender.com`;
const local_dev = `https://test-backend-lsea.onrender.com`;
const dev_origin = import.meta.env.REACT_APP_OFFICIAL_DEMO
  ? official_dev
  : local_dev;

// const local_dev = `https://im.ttt.td`;
export const BASE_ORIGIN = import.meta.env.REACT_APP_RELEASE
  ? `${location.origin}`
  : dev_origin;
export const IS_OFFICIAL_DEMO = BASE_ORIGIN === official_dev;

export const BASE_URL = `${BASE_ORIGIN}/api/v1`;

export const PAYMENT_URL_PREFIX =
  import.meta.env.NODE_ENV === "production"
    ? `https://rload-backend.onrender.com`
    : `https://rload-backend.onrender.com`;
export const CACHE_VERSION = `0.3.37`;
export const GuestRoutes = ["/", "/chat", "/chat/channel/:channel_id"];
export const ContentTypes = {
  text: "text/plain",
  markdown: "text/markdown",
  file: "rload/file",
  audio: "rload/audio",
  archive: "rload/archive",
  formData: "multipart/form-data",
  json: "application/json",
};
export const MessageTypes = {
  text: "text/plain",
  markdown: "text/markdown",
  audio: "rload/audio",
  file: "rload/file",
  archive: "rload/archive",
};
export const firebaseConfig = {
  apiKey: "AIzaSyCc3VuCJZgzQLIH2wrYdQzsUOc1DuZiIOA",
  authDomain: "vocechatdev.firebaseapp.com",
  projectId: "vocechatdev",
  storageBucket: "vocechatdev.appspot.com",
  messagingSenderId: "526613312184",
  appId: "1:526613312184:web:d13c92582baf470d487a4d",
  measurementId: "G-82RQ3YSCP7",
};
export const ChatPrefixes = {
  channel: "#",
  dm: "@",
};
export const vapidKey = `BOmzyZhw-DcIGYQ77mzQUVqLlcvn0bm_76P_kc7rpwRxzXNbui-JP8iPyEQYfyoxyJeq43Ud4IiIsJSMNHNujn0`;
export const tokenHeader = "Authorization";
export const SERVER_VERSION_KEY = "VC_SERVER_VERSION"; //
export const FILE_SLICE_SIZE = 1000 * 1000; //
export const FILE_IMAGE_SIZE = 1000 * 10000 * 8; //10mb
export const MOBILE_APP_TIP_KEY = "MOBILE_APP_TIP";
export const LOGIN_USER_KEY = "RLOAD_LOGIN_USER";
export const TOKEN_KEY = "RLOAD_TOKEN";
export const EXPIRE_KEY = "RLOAD_TOKEN_EXPIRE";
export const REFRESH_TOKEN_KEY = "RLOAD_REFRESH_TOKEN";
export const REFRESH_EXPIRE_KEY = "RLOAD_REFRESH_EXPIRE";
export const UID_KEY = "RLOAD_CURR_UID";
export const IS_EMAIL_SENT = "RLOAD_IS_EMAIL_SENT";
export const DEVICE_ID_KEY = "RLOAD_DEVICE_KEY";
export const DEVICE_TOKEN_KEY = "RLOAD_DEVICE_TOKEN";
export const USERS_VERSION_KEY = "RLOAD_USERS_VERSION";
export const AFTER_MID_KEY = "RLOAD_AFTER_MID";
export const PWA_INSTALLED_KEY = "RLOAD_PWA_INSTALLED";
export const LOCAL_MAGIC_TOKEN_KEY = "RLOAD_LOCAL_MAGIC_TOKEN";
export const LOCAL_TRY_PATH_KEY = "RLOAD_TRY_PATH";
export const REDIRECT_URL = "REDIRECT_URL";
export const FIRST_LOGIN_TIME = "FIRST_LOGIN_TIME";
export const Emojis = ["", "👍", "❤️", "😄", "👀", "👎", "🎉", "🙁", "🚀"];
export const webSocketEvents = {
  emit: {
    currentChat: "currentChat",
    userTyping: "userTyping",
    currentMessage: "currentMessage",
  },
  on: {
    initiateChat: "initiateChat",
    createChat: "createChat",
    createMessage: "createMessage",
    userTyping: "userTyping",
    getMessages: "getMessages",
  },
};




export const tableColor: TableDataT<any>["style"] = {
  background: "white",
  cellBackground: "white",
  exportBackground: 'white',
  filterBackground: "white",
  primary: colorScheme.primary_lightest,
  secondary: "black",
  tertiary: "hsl(236, 62%, 90%)",
  borderSpacing: "1px",
  cellHoverBackground: colorScheme.gray_2,
};