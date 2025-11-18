import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import listenerMiddleware from "./listeners";
import { adsApi } from "./services/ads/query";
import { authApi } from "./services/auth/auth.query";
import { chatApi } from "./services/chats/chats";
import { devProfileApi } from "./services/dev-profile/dev.profile.query";
import { gameAssetsApi, gamesApi, gameVersionsApi, systemRequirementsApi } from "./services/games/query";
import { notificationApi } from "./services/notifications/notification.query";
import { permissionApi } from "./services/roles/permission";
import { rolesApi } from "./services/roles/roles";
import { staffApi } from "./services/staff/staff.query";
import { statisticsApi } from "./services/statistics/statistics.query";
import { subscriptionApi } from "./services/subscription/query";
import { systemApi } from "./services/system/system.query";
import { userApi } from "./services/users/user.query";
import { authReducer } from "./slices/branded/auth/auth-slices/auth.slice";
import { devProfileReducer } from "./slices/branded/dev-profile/dev.profile.slice";
import { roleReducer } from "./slices/branded/roles/roles.slice";
import { systemReducer } from "./slices/branded/system/system.slice";
import { userReducer } from "./slices/branded/user/user.slice";
import { drawerReducer } from "./slices/drawer/drawer.type";
import { formReducer } from "./slices/forms/forms.type";
import { gameUploadReducer } from "./slices/games/games.slice";
import { miniLayoutReducer } from "./slices/miniLayout/mini-layout.types";
import { modalReducer } from "./slices/modal/modal.types";
import { notificationReducer } from "./slices/notification/slice.notification";
import { TableDataReducer } from "./slices/tableDataActions/table-data-actions.types";
import { utilsReducer } from "./slices/utils/utils.slices";

const combinedReducers = combineReducers({
  drawer: drawerReducer,
  modal: modalReducer,
  tableData: TableDataReducer,
  miniLayout: miniLayoutReducer,
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  utils: utilsReducer,
  system: systemReducer,
  devProfile: devProfileReducer,
  gameUpload: gameUploadReducer,
  notification: notificationReducer,
  role: roleReducer,

  [authApi.reducerPath]: authApi.reducer,
  [systemApi.reducerPath]: systemApi.reducer,
  [userApi.reducerPath]: userApi.reducer,

  [notificationApi.reducerPath]: notificationApi.reducer,
  [statisticsApi.reducerPath]: statisticsApi.reducer,
 
  [permissionApi.reducerPath]: permissionApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [devProfileApi.reducerPath]: devProfileApi.reducer,
  [gamesApi.reducerPath]: gamesApi.reducer,
  [gameAssetsApi.reducerPath]: gameAssetsApi.reducer,
  [systemRequirementsApi.reducerPath]: systemRequirementsApi.reducer,
  [gameVersionsApi.reducerPath]: gameVersionsApi.reducer,
  [adsApi.reducerPath]: adsApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,

  

});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(/* {
      serializableCheck: false,
    } */)
      .prepend(listenerMiddleware.middleware)
      .concat(
        authApi.middleware,
        systemApi.middleware,
        userApi.middleware,

        notificationApi.middleware,
        chatApi.middleware,
        devProfileApi.middleware,

        statisticsApi.middleware,
        gamesApi.middleware,
        gameAssetsApi.middleware,
        systemRequirementsApi.middleware,
        gameVersionsApi.middleware,

        permissionApi.middleware,
        rolesApi.middleware,
        staffApi.middleware,
        adsApi.middleware,
        subscriptionApi.middleware
      ),
});
let initialized = false;

setupListeners(store.dispatch, (dispatch, { onOnline, onOffline }) => {
  const handleOnline = () => dispatch(onOnline());
  const handleOffline = () => dispatch(onOffline());
  if (!initialized) {
    if (typeof window !== "undefined" && window.addEventListener) {
      // Handle connection events
      window.addEventListener("online", handleOnline, false);
      window.addEventListener("offline", handleOffline, false);
      initialized = true;
    }
  }

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
    initialized = false;
  };
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
