// reg.ts

import { lazy } from "react";

export const ErrorPage = lazy(
  () => import("../components/error-page/error-page")
);


export const Frontend = lazy(
  () => import("../components/mainpage/components/frontend/role")
);



export const SignIn = lazy(() => import("../components/signin/SignIn"));

export const ReadMode = lazy(() => import("../components/utilities/crud/read"));
export const UpdateMode = lazy(
  () => import("../components/utilities/crud/update")
);
export const MainPage = lazy(() => import("../pages/dashboard"));
