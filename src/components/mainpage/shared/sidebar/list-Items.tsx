import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";


import AssignmentIcon from "@mui/icons-material/Assignment";

import { useAppSelector } from "@/app/slices/hooks";
import SettingIcon from "@mui/icons-material/Settings";
import { Typography } from "@mui/material";
import { ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons";
import { ChartBar, Gamepad, MessageCircleHeart, PieChart, UserIcon, WorkflowIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { allPermissions } from "../../../../app/permissions";
import { colorScheme } from "../../../utilities/color-scheme";
import { myIcons } from "../../../utilities/icons";
import { HomeIcon } from "../../../utilities/icons/util-icons";
import { useCheckPermissions } from "../../../utilities/protocols/role-protocol";
import { capitalize, mergeCssClass } from "../../../utilities/utils";
import { dashboardListI } from "../../components/interface.dashboard/interface.dashboard";
import { CrudItemI, CrudItemPropI } from "../interface/interface.shared";

function dashboardList({
  name,
  icon,
  onClick,
  link_to,
  onHover,
  permission,
  children,
}: dashboardListI) {
  return { name, icon, onClick, link_to, onHover, permission, children };
}

// this is a side drawer for the dashboard
export const settingsAndRecord: dashboardListI[] = [
  // dashboardList({
  //   name: "Records",
  //   icon: <MonetizationOnIcon />,
  //   onClick: () => null,
  //   onHover: () => null,

  //   link_to: "records",
  //   permission: {
  //     permit: Object.values(allPermissions.Setting),
  //     exclude: [],
  //   },
  // }),
  dashboardList({
    name: "Settings",
    icon: (
      <div className="h-6 w-6">
        {" "}
        <myIcons.SettingIconBold />
      </div>
    ),

    onClick: () => null,
    onHover: () => null,
    link_to: "/settings",
    permission:{permit:[allPermissions.SuperAdmin, allPermissions.Admin, ]},

    // children: [
    //   {
    //     name: "profile",
    //     icon: <myIcons.SettingIconOthersBold />,
    //     onClick: () => null,
    //     onHover: () => null,
    //     link_to: "settings/profile",

    //     permission: { permit: [], exclude: [] },
    //   },
    //   {
    //     name: "shipping fee",
    //     icon: <myIcons.SettingIconOthersBold />,
    //     onClick: () => null,
    //     onHover: () => null,
    //     link_to: "/",
    //     permission: {
    //       permit: [allPermissions.SuperAdmin],
    //       exclude: [],
    //     },
    //   },

    //   {
    //     name: "system",
    //     icon: <myIcons.SettingIconOthersBold />,
    //     onClick: () => null,
    //     onHover: () => null,
    //     link_to: "/settings/system",

    //     permission: { permit: [allPermissions.SuperAdmin], exclude: [] },
    //   },
    //   {
    //     name: "vat",
    //     icon: <myIcons.SettingIconOthersBold />,
    //     onClick: () => null,
    //     onHover: () => null,
    //     link_to: "/",

    //     permission: { permit: [allPermissions.SuperAdmin], exclude: [] },
    //   },
    //   // {
    //   //   name: "paystack",
    //   //   icon: <myIcons.SettingIconOthersBold />,
    //   //   onClick: () => null,
    //   //   onHover: () => null,
    //   //   link_to: "/settings/",

    //   //   permission: { permit: [allPermissions.SuperAdmin], exclude: [] },
    //   // },
    // ],
  }),
];
export const dashboardItem: dashboardListI[] = [
  dashboardList({
    name: "Dashboard",
    icon: <HomeIcon />,
    onClick: () => null,
    onHover: () => null,
    link_to: "/",
  }),

  dashboardList({
    name: "games",
    icon: <Gamepad />,
    onHover: () => null,

    onClick: () => null,
    link_to: "/games",
    permission: {
      permit: [allPermissions.SuperAdmin, allPermissions.Admin, ...Object.values(allPermissions.Games)],
      exclude: [],
    }
  }),
  dashboardList({
    name: "Roles",
    icon: <PersonIcon />,
    onHover: () => null,

    onClick: () => null,
    link_to: "/role",
    permission: {
      permit: [allPermissions.SuperAdmin, allPermissions.Admin, ...Object.values(allPermissions.System)],
      exclude: [],
    },
  }),
  dashboardList({
    name: "staffs",
    icon: <WorkflowIcon />,
    onHover: () => null,

    onClick: () => null,
    link_to: "/staff",
    permission: {
      permit: [allPermissions.SuperAdmin, allPermissions.Admin],
      exclude: [],
    }
  }),

  dashboardList({
    name: "subscription",
    icon: <PieChart />,
    onHover: () => null,

    onClick: () => null,
    link_to: "/subscription",
    permission: {
      permit: [allPermissions.SuperAdmin, allPermissions.Admin, ...Object.values(allPermissions.Subscriptions)],
      exclude: [],
    }
  }),
  dashboardList({
    name: "revenue",
    icon: <myIcons.IconCreditCardSettingsOutline />,
    onHover: () => null,

    onClick: () => null,
    link_to: "/revenue",
    permission: {
      permit: [allPermissions.SuperAdmin, allPermissions.Admin, ...Object.values(allPermissions.Payments)],
      exclude: [],
    }
  }),
  dashboardList({
    name: "ads",
    icon: <ChartBar />,
    onHover: () => null,

    onClick: () => null,
    link_to: "/ads",
    permission: {
      permit: [allPermissions.SuperAdmin, allPermissions.Admin, ...Object.values(allPermissions.AdPlacements), ...Object.values(allPermissions.AdClicks), ...Object.values(allPermissions.AdImpressions)],
      exclude: [],
    }
  }),
  dashboardList({
    name: "developers",
    icon: <myIcons.IconGamepadFill />,
    onHover: () => null,

    onClick: () => null,
    link_to: "/developers",
    permission: {
      permit: [allPermissions.SuperAdmin, allPermissions.Admin, ...Object.values(allPermissions.Developers)],
      exclude: [],
    }
  }),
  dashboardList({
    name: "users",
    icon: <UserIcon />,
    onHover: () => null,

    onClick: () => null,
    link_to: "/user",
    permission: {
      permit: [allPermissions.SuperAdmin, allPermissions.Admin, ...Object.values(allPermissions.Users)],
      exclude: [],
    }
  }),
  dashboardList({
    name: "chat",
    icon: <ChatBubbleIcon />,
    onClick: () => null,
    onHover: () => null,
    link_to: "/chat",
    permission: {
      permit: [allPermissions.SuperAdmin, allPermissions.Admin, ...Object.values(allPermissions.Chats)],
      exclude: [],
    }
  }),
  dashboardList({
    name: "notifications",
    icon: <MessageCircleHeart />,
    onClick: () => null,
    onHover: () => null,
    link_to: "/notifications",
    permission: {
      permit: [allPermissions.SuperAdmin, allPermissions.Admin, ...Object.values(allPermissions.Communication)],
      exclude: [],
    }
  }),
];

// const permission = useCheckPermissions(data.permission);
// mapping the side drwer

const extractNamesRecursive = (
  items: dashboardListI[] | undefined
): string[] => {
  if (!items) {
    return [];
  }

  const names: string[] = [];

  items.forEach((data) => {
    if (data.link_to === undefined) {
      names.push(data.name);
    }

    if (data.children) {
      names.push(...extractNamesRecursive(data.children));
    }
  });

  return names;
};

export const MainListItems = ({
  sideBarList,
  theme = "default",
  isSideBar = true,
}: {
  sideBarList: dashboardListI[];
  theme?: "main" | "default";
  isSideBar?: boolean;
}) => {
  const location = useLocation();
  const { data:profileData, } =useAppSelector(state=>state.devProfile)


  const permission = useCheckPermissions();
  const names = extractNamesRecursive(sideBarList);
  const mapped: { [key: string]: { value: boolean } } = {};
  names.forEach((name) => {
    mapped[name] = { value: false };
  });

  const [click, setClick] = React.useState<{
    [key: string]: { value: boolean };
  }>(mapped);

  // //console.log(click, "click", names, "mapped", mapped);
  function clicker(name: string, value: boolean) {
    setClick((prevClick) => ({
      ...prevClick,
      [name]: { value },
    }));
  }
  function recursive(
    items: dashboardListI[] | undefined,
    depth: number | undefined = 0
  ) {
    if (!items) {
      return null;
    }

    return (
      items
        /* .sort((a, b) => a.name.localeCompare(b.name)) */
        .map((data, idx) => (
          <React.Fragment key={idx}>
            {permission.permit(
              data.permission?.permit ? [...data.permission.permit, allPermissions.SuperAdmin, allPermissions.Admin] : [],
              data.permission?.exclude
            ) && profileData&& (
              <>
                {data.link_to ? (
                  <NavLink
                    key={idx}
                    className={mergeCssClass(
                      ({
                        isActive,
                        isPending,
                        isTransitioning,
                      }: {
                        isActive: boolean;
                        isPending: boolean;
                        isTransitioning: boolean;
                      }) =>
                        [
                          isPending && theme === "default" ? "pending" : "",
                          !isSideBar ? "" : "",
                          isActive && theme === "default" ? "active" : "",
                          isTransitioning && theme === "default"
                            ? "transitioning"
                            : "",
                        ].join(" "),
                      data.link_to.split("/").join("") ===
                        location.pathname.split("/").join("")
                        ? theme === "default"
                          ? ""
                          : "text-[var(--primary)]"
                        : ""
                    )}
                    to={data.link_to}
                    end={true}
                  >
                    <ListItemButton >
                      <ListItemIcon sx={{ color: "var(--dark-0)",paddingY: 1.5,marginLeft: '7px' }}>
                        <div
                          className={mergeCssClass(
                            depth ? "h-4 w-4" : "h-5 w-5 ",
                            data.link_to.split("/").join("") ===
                              location.pathname.split("/").join("")
                              ? theme === "default"
                                ? "text-zinc-900"
                                : "text-[var(--primary-dark)]"
                              : "text-zinc-500"
                          )}
                        >
                          {/* <myIcons.PlainRightArrow /> */}
                          {data.icon}
                        </div>
                      </ListItemIcon>
                      <ListItemText
                        disableTypography={false}
                        className={mergeCssClass(
                          "  text-sm font-bold leading-4 self-center grow whitespace-nowrap my-auto  overflow-hidden",
                          !isSideBar ? "sm:hidden lg:block" : ""
                        )}
                        primary={
                          <Typography
                            sx={{ fontSize: 14 }}
                            className={mergeCssClass(
                              "font-bold self-center grow whitespace-nowrap mt-1  overflow-hidden",
                              data.link_to.split("/").join("") ===
                                location.pathname.split("/").join("")
                                ? theme === "default"
                                  ? "text-zinc-900"
                                  : "text-[var(--primary-dark)]"
                                : "text-zinc-500"
                            )}
                          >
                            {capitalize({ text: data.name })}
                          </Typography>
                        }
                        sx={{
                          color: colorScheme.dark_1,
                          fontSize: 12,
                        }}
                      />
                    </ListItemButton>
                  </NavLink>
                ) : (
                  <>
                    <ListItemButton
                      className="flex flex-row align-middle justify-between"
                      onClick={() => {
                        clicker(data.name, !click[data.name].value);
                        // //console.log(click, "click", names, "mapped", mapped);
                      }}
                    >
                      <ListItemIcon sx={{ color: "var(--dark-1)" }}>
                        <div
                          className={mergeCssClass(
                            depth ? "h-4 w-4" : "h-5 w-5 ",
                            "text-zinc-500"
                          )}
                        >
                          {/* <myIcons.PlainRightArrow /> */}
                          {data.icon}
                        </div>
                      </ListItemIcon>
                      <ListItemText
                        disableTypography={false}
                        primary={
                          <div className="flex flex-row justify-between items-stretch align-middle">
                            <Typography
                              sx={{ fontSize: depth ? 12 : 14 }}
                              className="text-zinc-500  active:text-zinc-800 text-sm font-bold leading-4 self-center grow whitespace-nowrap my-auto"
                            >
                              {capitalize({ text: data.name })}
                            </Typography>{" "}
                            <ListItemIcon>
                              {!click[data.name]?.value ? (
                                <div
                                  className={mergeCssClass(
                                    depth ? "h-4 w-4" : "h-5 w-5 "
                                  )}
                                >
                                  <myIcons.PlainRightArrow />
                                </div>
                              ) : (
                                <div
                                  className={mergeCssClass(
                                    depth ? "h-4 w-4" : "h-5 w-5 ",
                                    "animate-bounce"
                                  )}
                                >
                                  <myIcons.ChevronDownIcon />
                                </div>
                              )}
                            </ListItemIcon>
                          </div>
                        }
                        sx={{
                          color: colorScheme.dark_1,
                          fontSize: 12,
                        }}
                      />
                    </ListItemButton>
                    {click[data.name]?.value &&
                      data.children &&
                      data.children.length > 0 &&
                      recursive(data.children, 1)}
                  </>
                )}
              </>
            )}
          </React.Fragment>
        ))
    );
  }

  return recursive(sideBarList);
};

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Report" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingIcon />
      </ListItemIcon>
      <ListItemText primary="settings" />
    </ListItemButton>
  </React.Fragment>
);

// a list of crud functions with nav link

// eslint-disable-next-line react-refresh/only-export-components
export const roleCrud: CrudItemI[] = [
  {
    link_to: "/role/",
    name: "View Roles",
  },
  {
    link_to: "/role/add/",
    name: "New Role",
  },
];

export const expenseCrud: CrudItemI[] = [];
/**
 *
 * @param data  it takes the link to and the name of t he list
 * @returns
 */

export function CrudItems({ data }: CrudItemPropI) {
  return (
    <>
      {Object.entries(data).map(([idx, item]) => {
        return (
          <NavLink
            key={idx}
            className={({ isActive, isPending }) =>
              isActive ? "" : isPending ? "pending" : ""
            }
            to={item.link_to}
          >
            <Typography
              key={idx}
              fontSize={14}
              color="textSecondary"
              sx={{
                textTransform: "capitalize",
                position: "relative",

                fontWeight: 700,
                color: colorScheme.dark_2,
                py: 2,
              }}
            >
              {" "}
              {item.name}
            </Typography>
          </NavLink>
        );
      })}
    </>
  );
}
