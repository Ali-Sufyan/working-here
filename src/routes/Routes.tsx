import { createBrowserRouter, Outlet } from "react-router-dom";

import ErrorPage from "../components/error-page/error-page";


import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/slices/hooks";
// import { usePrefetchHook } from "../hooks/prefetch.hook";

import { useLazyGetUserRoleQuery } from "@/app/services/roles/roles";
import { setAccessData, setUserData } from "@/app/slices/branded/auth/auth-slices/auth.slice";
import Ads from "@/components/mainpage/components/ads";
import CreateAdPlacement from "@/components/mainpage/components/ads/components/create";
import ViewAds from "@/components/mainpage/components/ads/components/view-all";
import AnalyticsInsightsUI from "@/components/mainpage/components/analytics";
import Chats from "@/components/mainpage/components/chatbox";
import { SendNotification } from "@/components/mainpage/components/chatbox/components/chat";
import { ViewChat } from "@/components/mainpage/components/chatbox/components/view-chat";
import ViewChats from "@/components/mainpage/components/chatbox/components/view-chats";
import { ViewDevelopers } from "@/components/mainpage/components/developer/components/view-developers";
import Developers from "@/components/mainpage/components/developer/developers";
import GamesManagementUI from "@/components/mainpage/components/games_management/add-games";
import GameDetailPage from "@/components/mainpage/components/games_management/components/game-details";
import { Games } from "@/components/mainpage/components/games_management/games";
import Notifications from "@/components/mainpage/components/notification";
import { ViewNotification } from "@/components/mainpage/components/notification/components/view-notification";
import ViewNotifications from "@/components/mainpage/components/notification/components/view-notifications";
import PlayerManagementUI from "@/components/mainpage/components/player_management";
import RevenueAndPaymentsUI from "@/components/mainpage/components/revenue_and_payments";
import Roles from "@/components/mainpage/components/role";
import { CreateRoles } from "@/components/mainpage/components/role/components/create-role";
import { FetchRoleForUpdate } from "@/components/mainpage/components/role/components/update-role";
import { FetchRoleForView } from "@/components/mainpage/components/role/components/view-role";
import { ViewRoles } from "@/components/mainpage/components/role/components/view-roles";
import DeveloperSettingsPage from "@/components/mainpage/components/settings";
import { CreateStaff } from "@/components/mainpage/components/staff/components/create-staff";
import { MakeUserStaff } from "@/components/mainpage/components/staff/components/make-user-staff";
import { FetchStaffForUpdate } from "@/components/mainpage/components/staff/components/update-staff";
import { FetchStaffForView } from "@/components/mainpage/components/staff/components/view-staff";
import ViewStaffs from "@/components/mainpage/components/staff/components/view-staffs";
import Staffs from "@/components/mainpage/components/staff/staff";
import Subscriptions from "@/components/mainpage/components/subscription";
import CreateSubscription from "@/components/mainpage/components/subscription/components/create";
import ViewSubscriptions from "@/components/mainpage/components/subscription/components/view-all";
import Users from "@/components/mainpage/components/users";
import { CreateUser } from "@/components/mainpage/components/users/components/create-user";
import { FetchUserForUpdate } from "@/components/mainpage/components/users/components/update-user";
import { FetchUserForView } from "@/components/mainpage/components/users/components/view-user";
import { ViewUsers } from "@/components/mainpage/components/users/components/view-users";
import { SignOutPage } from "@/components/signout-page/sign-out";
import { CreateMode } from "@/components/utilities/crud/create";
import { AuthProtocol } from "@/components/utilities/protocols/auth-protocol";
import Loading from "@/components/utilities/styles/loading";
import { errorToast, successToast } from "@/components/utilities/toaster";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "../components/mainpage/components/dashboard/Dashboard";
import { default as MainPage } from "../pages/dashboard";
import { LazyIt } from "./lazy";
import { ReadMode, SignIn, UpdateMode } from "./lazy-loaders";

// const addCol = TableProcessor(data_combined.body)
// const data = addCol.addColumn({
//   goal:"school"
// })
let toastId: string;

export const Router = () => {
  const online = useAppSelector((state) => state.utils.isOnline);
  const dispatch = useAppDispatch();
  const c = useAuth0();
  
  const [getRoles] = useLazyGetUserRoleQuery();

  useEffect(() => {
    async function getAccessToken() {
      const cd = await c.getAccessTokenSilently();
      const cf = await c.getIdTokenClaims();
      if (cf?.exp) {
        dispatch(setAccessData({ accessToken: cd, exp: cf?.exp }));
        await getRoles();
      }
    }
    if (c && c.user) {
      dispatch(
        setUserData({
          ...c.user,
          id: "",
          firstName: c.user.given_name as unknown as string,
          lastName: c.user.family_name as unknown as string,
        })
      );

      getAccessToken();
    }
  }, [c, dispatch, getRoles]);

  // usePrefetchHook();
  useEffect(() => {
    if (!online) {
      toastId = errorToast("Network Offline!", { duration: Infinity });

    } else if (toastId) {
      toast.dismiss(toastId);
      successToast("Network Online!", { duration: 4000 });
    }
  }, [online]);
  return createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: (
        <AuthProtocol>
          <MainPage />
        </AuthProtocol>
      ),

      children: [
        {
          path: "",

          element: (
            // <AuthProtocol>
            <LazyIt>
              <Dashboard />
            </LazyIt>
            // </AuthProtocol>
          ),
        },
        {
          path: "analytics",
          element: <AnalyticsInsightsUI />,
        },
        {
          path: "games/",
          element: (
            <>
              <Outlet />
            </>
          ),
          children: [
            {
              path: "add",
              element: <GamesManagementUI />,
            },
            { path: "", element: <Games /> },
            {
              path: ":id/settings",
              element: <GameDetailPage />,
            },
          ],
        },
        {
          path: "role/",
          element: (
            <LazyIt>
              {" "}
              <Roles />
            </LazyIt>
          ),
          children: [
            {
              path: "",
              element: <ViewRoles />,
            },
            {
              path: "add/",
              element: <CreateMode />,
              children: [
                {
                  element: <CreateRoles />,
                  path: "",
                },
              ],
            },
            {
              path: ":roleId/edit",
              element: <UpdateMode />,
              children: [
                {
                  element: <FetchRoleForUpdate />,
                  path: "",
                },
              ],
            },
            {
              path: ":roleId/view",
              element: <ReadMode />,
              children: [
                {
                  element: <FetchRoleForView />,
                  path: "",
                },
              ],
            },
          ],
        },
        //developer routes
        {
          path: "developers/",
          element: <Developers />,
          children: [
            {
              path: "",
              element: <ViewDevelopers />,
            },
          ],
        },
        //staff routes
        {
          path: "staff/",
          element: <Staffs />,
          children: [
            {
              path: "",
              element: <ViewStaffs />,
            },
            {
              path: "add/",
              element: <CreateMode />,
              children: [{ path: "", element: <CreateStaff /> }],
            },
            {
              path: ":staffId/edit",
              element: (
                <Suspense fallback={<Loading fullscreen={true} />}>
                  <LazyIt>
                    {" "}
                    <UpdateMode />
                  </LazyIt>
                </Suspense>
              ),
              children: [
                {
                  path: "",
                  element: <FetchStaffForUpdate />,
                },
              ],
            },
            {
              path: ":staffId/view",
              element: <ReadMode />,
              children: [
                {
                  path: "",
                  element: (
                    <Suspense fallback={<Loading fullscreen={true} />}>
                      <LazyIt>
                        {" "}
                        <FetchStaffForView />
                      </LazyIt>
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },
        //ads route
        {
          path: "ads/",
          element: <Ads />,
          children: [
            {
              path: "",
              element: <ViewAds />,
            },
            {
              path: "add/",
              element: <CreateMode />,
              children: [{ path: "", element: <CreateAdPlacement /> }],
            },
          ],
        },
        //subscription route
        {
          path: "subscription/",
          element: <Subscriptions />,
          children: [
            {
              path: "",
              element: <ViewSubscriptions />,
            },
            {
              path: "add/",
              element: <CreateMode />,
              children: [{ path: "", element: <CreateSubscription /> }],
            },
          ],
        },
        // user routes
        {
          path: "user/",
          element: (
            <LazyIt>
              <Users />
            </LazyIt>
          ),
          children: [
            { path: "", element: <ViewUsers /> },
            {
              path: "add/",
              element: <CreateMode />,
              children: [
                {
                  path: "",
                  element: <CreateUser />,
                },
              ],
            },
            {
              path: ":userId/edit",
              element: <UpdateMode />,
              children: [
                {
                  path: "",
                  element: <FetchUserForUpdate />,
                },
              ],
            },
            {
              path: ":userId/view",
              element: <ReadMode />,
              children: [
                {
                  path: "",
                  element: <FetchUserForView />,
                },
              ],
            },
            {
              path: ":userId/makeUserStaff",
              element: <ReadMode />,
              children: [
                {
                  path: "",
                  element: <MakeUserStaff />,
                },
              ],
            },
            {},
          ],
        },
        {
          path: "chat/",
          element: <Chats />,
          children: [
            {
              path: "",
              element: (
                <Suspense fallback={<Loading fullscreen={true} />}>
                  <LazyIt>
                    {" "}
                    <ReadMode />
                  </LazyIt>
                </Suspense>
              ),
              children: [
                {
                  path: "",
                  element: (
                    <Suspense fallback={<Loading fullscreen={true} />}>
                      <LazyIt>
                        {" "}
                        <ViewChats />{" "}
                      </LazyIt>
                    </Suspense>
                  ),
                },
              ],
            },

            {
              path: ":chatId/view",
              element: (
                <Suspense fallback={<Loading fullscreen={true} />}>
                  <LazyIt>
                    {" "}
                    <ReadMode />
                  </LazyIt>
                </Suspense>
              ),
              children: [
                {
                  path: "",
                  element: (
                    <Suspense fallback={<Loading fullscreen={true} />}>
                      <LazyIt>
                        {" "}
                        <ViewChat />
                      </LazyIt>
                    </Suspense>
                  ),
                },
              ],
            },
            {
              path: "add/",
              element: <CreateMode />,
            },
          ],
        },
        {
          path: "notifications/",
          element: <Notifications />,
          children: [
            {
              path: "",
              element: (
                <Suspense fallback={<Loading fullscreen={true} />}>
                  <LazyIt>
                    {" "}
                    <ReadMode />
                  </LazyIt>
                </Suspense>
              ),

              children: [
                {
                  path: "",
                  element:
                   <Suspense fallback={<Loading fullscreen={true} />}>
                  <LazyIt>
                    {" "}
                  <ViewNotifications />,
                  </LazyIt>
                </Suspense>
                  
                  
                },
              ],
            },
            {
              path: "add",
              element: <ReadMode />,
              children: [
                {
                  path: "",
                  element: <SendNotification />,
                },
              ],
            },
            {
              path: ":notificationId/view",
              element: <ReadMode />,
              children: [
                {
                  path: "",
                  element: <ViewNotification />,
                },
              ],
            },
            {
              path: "add/",
              element: <CreateMode />,
            },
          ],
        },
        {
          path: "player-mgt",
          element: <PlayerManagementUI />,
        },
        {
          path: "revenue",
          element: <RevenueAndPaymentsUI />,
        },
        {
          path: "settings",
          element: <DeveloperSettingsPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path: "/logout",
      element: <SignOutPage />,
    },
    {
      path: "*",
      errorElement: <ErrorPage />,
    },
  ]);
};
