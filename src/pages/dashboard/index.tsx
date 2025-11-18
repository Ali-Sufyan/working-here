import { Outlet } from "react-router-dom";
import { CustomAppBar } from "../../components/mainpage/shared/appbar/appbar";
import { CustomSideDrawer } from "../../components/mainpage/shared/sidebar/side-drawer";

import { useLazyGetUserRoleQuery } from "@/app/services/roles/roles";
import { setAccessData, setUserData } from "@/app/slices/branded/auth/auth-slices/auth.slice";
import { useAppDispatch } from "@/app/slices/hooks";
import Loading from "@/components/utilities/styles/loading";
import { useAuth0 } from "@auth0/auth0-react";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme } from "@mui/material";
import { useEffect } from "react";
import { colorScheme } from "../../components/utilities/color-scheme";

const defaultTheme = createTheme();

export default function MainPage() {
  // const { permit } = useCheckPermissions();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (permit([allPermissions.SuperAdmin]) && !compareLoginDate()) {
  //     //console.log("redirect to exchange rate");
  //     // return navigate("/settings/exchange-rate");
  //   }
  // }, [navigate, permit]);


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
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", background: colorScheme.gray_2 }}>
        <CssBaseline />
        <CustomAppBar />
        <CustomSideDrawer />
        <div className="mt-16 w-[95%] sm:w-full sm:ml-[100px] mx-auto">
          {c.isLoading ? (
            <Loading fullscreen={true} transparent={true} />
          ) : (c.isAuthenticated && <Outlet />)}
        </div>
      </Box>
      {/* <ZoomTool /> */}
    </ThemeProvider>
  );
}
