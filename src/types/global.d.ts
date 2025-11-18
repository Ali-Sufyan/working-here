/* eslint-disable @typescript-eslint/no-explicit-any */
export declare global {
  import localforage from "localforage";
  import { PrecacheEntry } from "workbox-precaching/src/_types";
  interface Document {
    webkitHidden: boolean;
  }
  interface Window {
    AUTO_RELOAD: boolean;
    AFTER_MID: number;
    USERS_VERSION: number;
    __WB_MANIFEST: Array<PrecacheEntry | string>;
    skipWaiting: () => void;
    CACHE: { [key: string]: typeof localforage | undefined };
    VOICE_CLIENT?: IAgoraRTCClient;
    VOICE_TRACK_MAP: {
      [key: number]:
        | IRemoteAudioTrack
        | IMicrophoneAudioTrack
        | undefined
        | null;
    };
    VIDEO_TRACK_MAP: {
      [key: number]:
        | IRemoteVideoTrack
        | ICameraVideoTrack
        | ShareScreenTrack
        | undefined
        | null;
    };
  }
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface Element {
    scrollIntoViewIfNeeded?: any;
  }
}
