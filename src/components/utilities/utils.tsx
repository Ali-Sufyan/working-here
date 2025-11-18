 
 
/* eslint-disable react-refresh/only-export-components */
import dayjs from "dayjs";

import {
  EXPIRE_KEY,
  FILE_IMAGE_SIZE,
  FIRST_LOGIN_TIME,
  LOGIN_USER_KEY,
  REDIRECT_URL,
  REFRESH_EXPIRE_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_KEY,
} from "../../app/config";

import IconAudio from "../../assets/icons/file.audio.svg";

import { GeneralStatusE } from "@/app/services/ads/types";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { SwipeableHandlers, useSwipeable } from "react-swipeable";
import { twMerge } from "tailwind-merge";
import { AuthPayloadI } from "../../app/slices/branded/auth/auth-types/auth.types";
import { UserI } from "../../app/slices/branded/user/user.types";
import IconCode from "../../assets/icons/file.code.svg";
import IconDoc from "../../assets/icons/file.doc.svg";
import IconImage from "../../assets/icons/file.image.svg";
import IconPdf from "../../assets/icons/file.pdf.svg";
import IconUnknown from "../../assets/icons/file.unknown.svg";
import IconVideo from "../../assets/icons/file.video.svg";

export function mergeCssClass(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type MentionInput = {
  type: "mention";
  value: string;
  uid: string;
  id: string;
};
export type ParagraphInput = {
  id: string;
  type: "p";
  children: ({ text: string } | MentionInput)[];
};
export const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

export const getLocalAuthData = () => {
  return {
    token: localStorage.getItem(TOKEN_KEY) || "",
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || "",
    expireTime: localStorage.getItem(EXPIRE_KEY),
    refreshExpireTime: localStorage.getItem(REFRESH_EXPIRE_KEY),
  };
};
export const setLocalAuthData = (data: AuthPayloadI) => {
  const { tokens, user } = data;

  localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, tokens.access.token);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh.token);
  localStorage.setItem(EXPIRE_KEY, tokens.access.expires);
  localStorage.setItem(REFRESH_EXPIRE_KEY, tokens.refresh.expires);
};

export const getLocalUserData = (): UserI => {
  const d = localStorage.getItem(LOGIN_USER_KEY) ?? "{}";
  return JSON.parse(d);
};
export const clearLocalUserData = () => {
  localStorage.removeItem(LOGIN_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRE_KEY);
  localStorage.removeItem(REFRESH_EXPIRE_KEY);
};

export const compareLoginDate = (): boolean => {
  // Retrieve the date from localStorage
  const currentDate = new Date();
  const savedDate = getFirstLoginTime();
  if (!savedDate) {
    setFirstLoginTime();
    return false;
  }

  // Compare day, month, and year
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const savedDay = savedDate.getDate();
  const savedMonth = savedDate.getMonth();
  const savedYear = savedDate.getFullYear();

  // Compare the components
  if (
    currentDay === savedDay &&
    currentMonth === savedMonth &&
    currentYear === savedYear
  ) {
    return true;
  } else {
    setFirstLoginTime();
    return false;
  }
};

export const setFirstLoginTime = () => {
  const date = new Date();
  localStorage.setItem(FIRST_LOGIN_TIME, date.toString());
};
export const getFirstLoginTime = () => {
  const date = localStorage.getItem(FIRST_LOGIN_TIME);
  if (!date) return;
  return new Date(date);
};

export const isImage = (file_type = "", size = 0) => {
  return (
    file_type.startsWith("image") &&
    file_type !== "image/x-sony-arw" &&
    size <= FILE_IMAGE_SIZE
  );
};
export function setRedirectUrl(str: string) {
  sessionStorage.setItem(REDIRECT_URL, str);
}
export function getRedirectUrl() {
  const data = sessionStorage.getItem(REDIRECT_URL);
  removeRedirectUrl();
  return data;
}

export function removeRedirectUrl() {
  sessionStorage.removeItem(REDIRECT_URL);
}

export const isTreatAsImage = (file: File) => {
  const { type, size } = file;
  if (type.startsWith("image")) {
    return size < 1024 * 1024; // 10MB
  }
  return false;
};
export const isElementVisible = (el: Element | null) => {
  if (!el) return false;
  const rect = el.getBoundingClientRect(),
    vWidth = window.innerWidth || document.documentElement.clientWidth,
    vHeight = window.innerHeight || document.documentElement.clientHeight,
    efp = function (x: number, y: number) {
      return document.elementFromPoint(x, y);
    };
  // Return false if it's not in the viewport
  if (
    rect.right < 0 ||
    rect.bottom < 0 ||
    rect.left > vWidth ||
    rect.top > vHeight
  )
    return false;
  // Return true if any of its four corners are visible
  return (
    el.contains(efp(rect.left, rect.top)) ||
    el.contains(efp(rect.right, rect.top)) ||
    el.contains(efp(rect.right, rect.bottom)) ||
    el.contains(efp(rect.left, rect.bottom))
  );
};
export function getDefaultSize(
  size?: { width: number; height: number },
  limit?: { min: number; max: number }
) {
  if (!size) return { width: 0, height: 0 };
  const { min, max } = limit ?? { min: 200, max: 320 };
  const { width: oWidth, height: oHeight } = size;
  if (oWidth == oHeight) {
    const tmp = min > oWidth ? min : oWidth < max ? oWidth : max;
    return { width: tmp, height: tmp };
  }
  const isVertical = oWidth <= oHeight;
  let dWidth = 0;
  let dHeight = 0;
  if (isVertical) {
    dHeight = oHeight < min ? min : oHeight < max ? oHeight : max;
    dWidth = (oWidth / oHeight) * dHeight;
  } else {
    dWidth = oWidth < min ? min : oWidth < max ? oWidth : max;
    dHeight = (oHeight / oWidth) * dWidth;
  }
  return { width: dWidth, height: dHeight };
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
export const getImageSize = (url: string) => {
  const size = { width: 0, height: 0 };
  if (!url) return size;
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      size.width = img.width;
      size.height = img.height;
      resolve(size);
    };
    img.onerror = () => {
      resolve(size);
    };
  });
};
/**
 * @param {File|Blob} - file to slice
 * @param {Number} - chunksAmount
 * @return {Array} - an array of Blobs
 **/
export function sliceFile(file: File | null, chunksAmount: number) {
  if (!file) return null;
  let byteIndex = 0;
  const chunks = [];
  for (let i = 0; i < chunksAmount; i += 1) {
    const byteEnd = Math.ceil((file.size / chunksAmount) * (i + 1));
    chunks.push(file.slice(byteIndex, byteEnd));
    byteIndex += byteEnd - byteIndex;
  }
  return chunks;
}
export const getFileIcon = (type: string, name = "", className = "icon") => {
  let icon = null;
  const checks = {
    image: /^image/gi,
    audio: /^audio/gi,
    video: /^video/gi,
    code: /(json|javascript|java|rb|c|php|xml|css|html)$/gi,
    doc: /^text/gi,
    pdf: /\/pdf$/gi,
  };
  const _arr = (name ?? "").split(".");
  const _type = type || _arr[_arr.length - 1];
  switch (true) {
    case checks.image.test(_type):
      {
        icon = <IconImage className={className} />;
      }
      break;
    case checks.pdf.test(_type):
      icon = <IconPdf className={className} />;
      break;
    case checks.code.test(_type):
      icon = <IconCode className={className} />;
      break;
    case checks.doc.test(_type):
      icon = <IconDoc className={className} />;
      break;
    case checks.audio.test(_type):
      icon = <IconAudio className={className} />;
      break;
    case checks.video.test(_type):
      icon = <IconVideo className={className} />;
      break;
    default:
      icon = <IconUnknown className={className} />;
      break;
  }
  return icon;
};
/*!
 * Get the contrasting color for any hex color
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
export const getContrastColor = (hexcolor: string) => {
  if (!hexcolor) return "";
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }
  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }
  // Convert to RGB value
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  // Check contrast
  return yiq >= 128 ? "black" : "white";
};
export const isElectronContext = () => {
  return navigator.userAgent.toLowerCase().indexOf("electron/") > -1;
};
export const isDarkMode = () => {
  const isDarkMode = localStorage.theme === "dark";
  const isLightMode = localStorage.theme === "light";
  return (
    isDarkMode ||
    (!isLightMode && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
};
export const platform = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isMac = ua.indexOf("darwin") != -1;
  const isWindows = ua.indexOf("win32") != -1;
  const isLinux = ua.indexOf("linux") != -1;
  return {
    isMac,
    isWindows,
    isLinux,
  };
};

export const fromNowTime = (ts?: number) => {
  if (!ts) return null;
  const currTS = +new Date();
  return dayjs(ts > currTS ? currTS : ts);
};

// 转换一下邀请连接
export const transformInviteLink = (link: string) => {
  // 确保 http 开头
  const _link = link.startsWith("http") ? link : `http://${link}`;
  // return _link;
  // 替换掉域名
  const invite = new URL(_link);
  const tmpLink = `${location.origin}${invite.pathname}${invite.hash}${invite.search}`;

  return tmpLink;
};

export const reloadCurrentPage = () => {
  if (isElectronContext()) {
    // // 改变 theme color 然后 electron reload（约定）
    // const metaThemeColor = document.querySelector("meta[name=theme-color]");
    // if (metaThemeColor) {
    //   metaThemeColor.setAttribute("content", "#123456");
    // } else {
    //   const meta = document.createElement("meta");
    //   meta.name = "theme-color";
    //   meta.content = "#123456";
    //   document.head.appendChild(meta);
    // }
    // reload 两次 electron webview bug?
    setTimeout(() => {
      location.reload();
    }, 100);
    location.reload();
  } else {
    window.location.reload();
  }
};
export const isInIframe = () => window.location !== window.parent.location;
export const encodeBase64 = (str = "") =>
  btoa(unescape(encodeURIComponent(str)));
export const shouldPreviewImage = (type: string) => {
  return type.startsWith("image") && type !== "image/x-sony-arw";
};

// export const sortUsersByRole = (users: StoredUser[]) => {
//   return users.sort((a, b) => {
//     const a_isAdmin = Number(a.is_admin && !a.is_bot);
//     const b_isAdmin = Number(b.is_admin && !b.is_bot);
//     return (
//       Number(b_isAdmin) - Number(a_isAdmin) ||
//       Number(b.is_bot) - Number(a.is_bot)
//     );
//   });
// };

export const getInitialsAvatar = ({
  initials = "UK",
  initial_size = 0,
  size = 200,
  foreground = "#fff",
  background = "#4c99e9",
  weight = 400,
  fontFamily = "'Lato', 'Lato-Regular', 'Helvetica Neue'",
}) => {
  const canvas = document.createElement("canvas");
  // const d = Math.min(window.innerWidth, window.innerWidth);
  const d = 600;
  const width = (d / 800) * size;
  const initial_size_d = initial_size ? (d / 1100) * initial_size : 0;
  const height = width;
  const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.scale(devicePixelRatio, devicePixelRatio);

  // Draw a circle instead of a rectangle
  context.beginPath();
  context.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
  context.fillStyle = background;
  context.fill();

  // Adjust font size based on the number of characters
  const subtract =
    initials.length > 3
      ? 50
      : initials.length > 2
      ? 40
      : initials.length === 2
      ? 30
      : 0;

  context.font = `${weight} ${(initial_size_d - subtract) / 2}px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = foreground;
  context.fillText(initials, width / 2, height / 2);

  /* istanbul ignore next */
  return canvas.toDataURL("image/png");
};

export const capitalize = ({ text }: { text: string }) => {
  const __text = text ?? "";
  let _text = __text.charAt(0).toUpperCase() + __text.slice(1);

  if (__text.includes(" ")) {
    const newText = __text.split(" ");
    const data = newText.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });
    _text = data.join(" ");
  }
  return _text;
};

export function splitByUppercase(text: string): string[] {
  const words: string[] = [];
  let currentWord = "";

  for (const char of text) {
    if (char.toUpperCase() === char) {
      if (currentWord) {
        words.push(currentWord);
      }
      currentWord = "";
    }
    currentWord += char;
  }

  if (currentWord) {
    words.push(currentWord);
  }

  return words;
}

export function deleteFields<T extends object>(
  obj: T,
  fields: (keyof T)[]
): Partial<T> {
  return Object.keys(obj)
    .filter(
      (key) =>
        !fields.includes(key as keyof T) &&
        Object.prototype.hasOwnProperty.call(obj, key)
    )
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: obj[key as keyof T],
      };
    }, {} as Partial<T>);
}

type KeyOf<T> = keyof T;
/**
 * The `easyPick` function takes an object and an array of keys, and returns a new object with only the
 * properties specified by the keys.
 * @param object - The `object` parameter is an object of type `T` or a partial object of type `T`. It
 * represents the object from which properties will be picked.
 * @param {KeyOf<T>[]} keys - An array of keys that represent the properties to be picked from the
 * `object` parameter.
 */
export function easyPick<T>(objs: Partial<T>, keys: KeyOf<T>[]): Partial<T> {
  return keys.reduce((obj, key) => {
    if (objs && Object.prototype.hasOwnProperty.call(objs, key)) {
       
      obj[key] = objs[key];
    }
    return obj;
  }, {} as Partial<T>);
}

export function parseNotification(s: string): {
  jsonData: string | object;
  subject: string;
  metaData: string;
} {
  const startIndex: number = s.indexOf("{");
  const endIndex: number = s.lastIndexOf("}") + 1;

  // Extract JSON string
  let jsonString: string = s.substring(startIndex, endIndex);
  const regex = /}\s*headers\s*{/i;

  if (regex.test(jsonString)) {
    const parts = jsonString.split(regex);
    jsonString = parts[0] + "}";
  }
  // Parse JSON
  let jsonData;
  try {
    jsonData = JSON.parse(jsonString) as object;
  } catch (e) {
    jsonData = jsonString as string;
  }

  // Extract remaining text
  const remainingBText: string = s.substring(0, startIndex);
  const remainingEText: string = s.substring(endIndex);

  if (remainingBText.includes(":")) {
    remainingBText.split(":")[0];
  }
  if (remainingEText.includes(":")) {
    remainingEText.split(":")[0];
  }

  return { jsonData, subject: remainingBText, metaData: remainingEText };
}

export const RenderHtml = ({
  jsonData,
  metaData,
  subject,
}: {
  jsonData: object | string;
  subject?: string;
  metaData?: string;
}) => {
  function parseData(data: object) {
    if (data !== null && data !== undefined) {
      return (
        <div>
          {Object.entries(data).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-row flex-wrap px-2 py-1 overflow-auto "
            >
              {typeof value !== "object" && (
                <div
                  className="text-gray-500"
                  style={{ fontSize: "12px", fontWeight: 400 }}
                >
                  {key}
                </div>
              )}
              {typeof value === "object" && !Array.isArray(value) ? (
                parseData(value)
              ) : Array.isArray(value) ? (
                value.map((d) => {
                  if (typeof d === "object") {
                    return parseData(d);
                  } else {
                    return <div dangerouslySetInnerHTML={{ __html: d }} />;
                  }
                })
              ) : (
                <div
                  className="px-2 text-primary-darkest"
                  style={{ fontSize: "12px", fontWeight: 500 }}
                >
                  {value}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      return <></>;
    }
  }

  const renderJsonData = () => {
    if (typeof jsonData === "object" && jsonData) {
      return parseData(jsonData);
    } else {
      return <div dangerouslySetInnerHTML={{ __html: jsonData }} />;
    }
  };

  return (
    <>
      <div className="p-2 rounded-md   w-[100%] justify-start items-center text-sm break-words ">
        <div className="h-2 relative" />
        <div className="h-full justify-start items-center gap-3 block">
          {" "}
          {subject && (
            <div className="text-[16px] font-semibold py-1 text-black leading-none">
              subject
            </div>
          )}
          {subject && (
            <div className="text-[14px] font-normal text-black leading-none">
              {subject}
            </div>
          )}
          <div className="text-[12px] font-normal text-black leading-none">
            <div className="text-[12px] font-semibold py-1 text-black leading-none">
              Details
            </div>

            <div>{renderJsonData()}</div>
          </div>
          {metaData && (
            <div className="text-[14px] font-normal text-black leading-none">
              {metaData}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
interface SwipeableComponentProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  children: React.ReactNode;
}

export const SwipeableComponent: React.FC<SwipeableComponentProps> = ({
  onSwipeLeft,
  onSwipeRight,
  children,
}) => {
  const handlers: SwipeableHandlers = useSwipeable({
    onSwiped: (eventData) => console.log("User Swiped!", eventData),
    onSwipedLeft: () => {
      onSwipeLeft && onSwipeLeft();
    },
    onSwipedRight: () => {
      onSwipeRight && onSwipeRight();
    },
  });

  return <div {...handlers}>{children}</div>;
};
export function isImageURL(url:string) {
  const imageRegex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg)(\?.*)?$/i;
  return imageRegex.test(url);
}
export function reduceTextLength(text: string, length: number) {
  if (text.length > length) {
    return `${text.substring(0, length-3)}...`;
  }
  return text;
}

export function findKeyByValue(obj: Record<string, string>, value: string): string | undefined {

  
  return Object.keys(obj).find(key => obj[key] === value);
}

export const HandleSvg: React.FC<{ className?: string, child:JSX.Element }> = ({ className, child }) => {
  return (
    <div className={className}>
      {child}
    </div>
  );
}




export const STATUS_CONFIG:{[key:string]:{label:string, className:string, icon?:string}}
 = {
  [GeneralStatusE.APPROVED]: {
    label: "Approved",
    className: "bg-green-100 text-green-700",
    icon: "✅", // Optional: Add an icon
  },
  [GeneralStatusE.PENDING]: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
    icon: "⏳", // Optional: Add an icon
  },
  [GeneralStatusE.REJECTED]: {
    label: "Rejected",
    className: "bg-red-100 text-red-700",
    icon: "❌", // Optional: Add an icon
  },
  [GeneralStatusE.SUSPENDED]: {
    label: "Suspended",
    className: "bg-gray-100 text-gray-700",
    icon: "⛔", // Optional: Add an icon
  },
  [GeneralStatusE.PROCESSED]: {
    label: "Processed",
    className: "bg-blue-100 text-blue-700",
    icon: "✔️", // Optional: Add an icon
  },
  [GeneralStatusE.DISABLED]: {
    label: "Disabled",
    className: "bg-gray-100 text-gray-700",
    icon: "🚫", // Optional: Add an icon
  },
  [GeneralStatusE.ACTIVE]: {
    label: "Active",
    className: "bg-green-100 text-green-700",
    icon: "🌟", // Optional: Add an icon
  },
  [GeneralStatusE.COMPLETED]: {
    label: "Completed",
    className: "bg-purple-100 text-purple-700",
    icon: "🎉", // Optional: Add an icon
  },
  [GeneralStatusE.PAUSED]: {
    label: "Paused",
    className: "bg-orange-100 text-orange-700",
    icon: "⏸️", // Optional: Add an icon
  },
};

export const StatusUi = ({ status }: { status: string | boolean }) => {
  
  if (typeof status === "boolean") {
    status = status ? GeneralStatusE.APPROVED : GeneralStatusE.REJECTED;
  }
  const statusConfig = STATUS_CONFIG[status] || {
    label: "Unknown",
    className: "bg-gray-100 text-gray-700",
    icon: "❓",
  };

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.className}`}
    >
      {statusConfig.icon && <span className="mr-2">{statusConfig.icon}</span>}
      {statusConfig.label}
    </div>
  );
};


