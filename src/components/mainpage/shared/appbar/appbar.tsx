import { styled } from "@mui/material/styles";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { openDrawer } from "../../../../app/slices/drawer/drawer.type";
import {
  useAppDispatch,
  useAppSelectorEqual,
} from "../../../../app/slices/hooks";
import { colorScheme } from "../../../utilities/color-scheme";
import NotificationDropDown from "./notification";
import ProfileDropDown from "./profile-drop-down";

const drawerWidth = 200;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const CustomAppBar = () => {
  const drawer = useAppSelectorEqual((state) => state.drawer.open);
  // const getDevProfile = useAppSelector(state => state.devProfile);
  // const [_profile, setProfile] = React.useState<IDeveloperProfileFull>(
  //   getDevProfile.data
  // );
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (getDevProfile.loading === false && getDevProfile.data)
  //     setProfile(getDevProfile.data);
  // }, [getDevProfile]);

  const dispatch = useAppDispatch();

  const toggleDrawer = () => {
    dispatch(openDrawer());
  };

  return (
    <AppBar position="fixed" open={drawer}>
      <Toolbar
        sx={{
          background: colorScheme.primary,
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: { xs: "10px", md: "10px" },
            ...(drawer && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          className="flex-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/assets/images/logocouleur.svg"
            alt="logo"
            className="w-36 h-14"
          />
        </Typography>

        {/* <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            alignItems: "center",
            gap: 1,
          }}
        >
          {profile.verificationStatus === "PENDING" && (
            <>
              <Clock
                height={18}
                aria-label="Clock Icon"
              />
              <Typography variant="body1" color="white" noWrap 
              sx={{
          }}>
                Account Under Review
              </Typography>
            </>
          )}
        </Box> */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            justifyContent: "space-between",
            marginRight: { xs: "0px", md: "10px" },
          }}
        >
          <NotificationDropDown />
          <ProfileDropDown />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
