import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { openDrawer } from "../../../../app/slices/drawer/drawer.type";
import {
  useAppDispatch,
  useAppSelectorEqual,
} from "../../../../app/slices/hooks";
// import { RloadLogo } from "../../../../assets/logo/logo";
import { colorScheme } from "../../../utilities/color-scheme";
import { MainListItems, dashboardItem } from "./list-Items";
import { useEffect, useCallback } from "react";

const drawerWidth = 200;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "fixed",
    whiteSpace: "nowrap",
    width: drawerWidth,
    height: "100vh",
    overflow: "hidden",
    backgroundColor: colorScheme.gray_1,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
    "&:hover": {
      width: drawerWidth,
    },
  },
}));

export const CustomSideDrawer = () => {
  const navigate = useNavigate();
  const drawer = useAppSelectorEqual((state) => state.drawer.open);
  const dispatch = useAppDispatch();

  const toggleDrawer = () => {
    dispatch(openDrawer());
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      // Get the drawer element
      const drawerElement = document.querySelector(".MuiDrawer-paper");
      if (!drawerElement) return;

      // Check if the click is outside the drawer
      if (drawer && !drawerElement.contains(event.target as Node)) {
        dispatch(openDrawer());
      }
    },
    [drawer, dispatch]
  );

  useEffect(() => {
    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Drawer variant="permanent" open={drawer}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          background: "white",
          gap: "24px",
        }}
      >
        {drawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="flex flex-col items-center justify-center align-middle cursor-pointer"
              onClick={() => navigate("/")}
            >
              {/* <div className="flex flex-row items-center justify-center w-16 h-16 pb-1 align-middle elevated-paper-round"> */}
              <img
                src="/assets/images/Icone-couleur.jpg"
                alt="logo"
                width={56}
                height={56}
                className=""
              />
              {/* </div> */}
            </div>
          </motion.div>
        )}
        <IconButton onClick={toggleDrawer} className="-mr-4">
          <ChevronLeftIcon className="w-8 h-8" />
        </IconButton>
      </Toolbar>
      <Divider />
      <List
        component="nav"
        className="flex flex-col justify-between h-full bg-white"
      >
        <div>
          <MainListItems sideBarList={dashboardItem} theme="main" />
        </div>
        {/* <div className="mb-2">
          <Divider sx={{ my: 1 }} />
          <MainListItems sideBarList={settingsAndRecord} theme="main" />
        </div> */}
      </List>
    </Drawer>
  );
};
