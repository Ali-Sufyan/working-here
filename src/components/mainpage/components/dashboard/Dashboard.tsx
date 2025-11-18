import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Box from "@mui/material/Box";
import { Bell, Settings, Star, TicketCheck } from "lucide-react";

import {
  HandleSvg,
  isMobile,
  mergeCssClass,
} from "@/components/utilities/utils";
import { useNavigate } from "react-router-dom";
import { fakeStatistics } from "../../../../app/services/statistics/statistics.query";
import { CustomChart } from "../../../utilities/custom-chart";
import { myIcons } from "../../../utilities/icons";

function Dashboard() {
  // const dispatch = useAppDispatch();

  // const c = useAuth0();
  // const navigate = useNavigate();
  // const [getRoles] = useLazyGetUserRoleQuery();

  // useEffect(() => {
  //   async function getAccessToken() {
  //     const cd = await c.getAccessTokenSilently();
  //     const cf = await c.getIdTokenClaims();
  //     if (cf?.exp) {
  //       dispatch(setAccessData({ accessToken: cd, exp: cf?.exp }));
  //       await getRoles();
  //     }
  //   }
  //   if (c && c.user) {
  //     dispatch(
  //       setUserData({
  //         ...c.user,
  //         id: "",
  //         firstName: c.user.given_name as unknown as string,
  //         lastName: c.user.family_name as unknown as string,
  //       })
  //     );

  //     getAccessToken();
  //   }
  // }, [c, dispatch, navigate, getRoles]);

  return (
    <div className="min-h-screen">
      <>
        {
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minHeight: "100vh",
              height: "100%",
            }}
          >
            <div className="px-4 py-8 mx-auto bg-gray-50">
              <h1 className="mt-5 mb-8 text-3xl font-bold text-gray-900">
                Quick Overview
              </h1>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr",
                    md: "1fr",
                    lg: "1fr 1fr",
                  },
                  gap: 2,
                  maxWidth: "100%",
                }}
              >
                {fakeStatistics.map((stats, key) => (
                  <Box key={key}>
                    <CustomChart
                      amount={stats.count}
                      name={stats.details ?? ""}
                      avatar_color={"#eff6ff"}
                      show_currency={stats.name.includes("$")}
                      chart="line"
                      data={stats.weeklyReport ?? []}
                      show_chart={true}
                      icon={
                        <div className="w-6 h-6 text-primary">
                          <myIcons.IconGameControllerSharp />
                        </div>
                      }
                      metadata={stats.name ?? ""}
                    />
                  </Box>
                ))}
              </Box>

              {/* Quick Actions Section */}
              <Box sx={{ mt: 4 }}>
                <DashboardQuickActions />
              </Box>

              {/* Tables Section */}
              {/* <Paper
                sx={{
                  p: 2,
                  mt: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TablesForDashboard />
              </Paper> */}
            </div>
          </Box>
        }
      </>
    </div>
  );
}
export default Dashboard;

const DashboardQuickActions = () => {
  const navigate = useNavigate();
  interface IQuickAction {
    icon: JSX.Element;
    title: string;
    description: string;
    link: string;
  }
  const quickActions: Array<IQuickAction> = [
    {
      icon: (
        <HandleSvg
          child={<myIcons.IconCloudDownloadFill />}
          className="w-6 h-6"
        />
      ),
      title: "Upload Game",
      description: "Add a new game to your portfolio",
      link: "/games/add",
    },
    {
      icon: <HandleSvg child={<myIcons.BankNoteIcon />} className="w-6 h-6" />,
      title: "Withdraw Funds",
      description: "Transfer available balance",
      link: "/revenue",
    },
    {
      icon: <HandleSvg child={<myIcons.IconLineChart />} className="w-6 h-6" />,
      title: "View Reports",
      description: "Check latest analytics",
      link: "/report",
    },
    {
      icon: (
        <HandleSvg
          child={<myIcons.IconCustomerService2Fill />}
          className="w-6 h-6"
        />
      ),
      title: "Update Version",
      description: "Push new game updates",
      link: "/games",
    },
  ];

  const activityFeed = [
    {
      type: "review",
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      title: "New 5-star Review",
      game: "Space Explorer",
      time: "5 minutes ago",
    },
    {
      type: "ticket",
      icon: <TicketCheck className="w-5 h-5 text-blue-500" />,
      title: "Support Ticket Updated",
      game: "Medieval Quest",
      time: "15 minutes ago",
    },
    {
      type: "notification",
      icon: <Bell className="w-5 h-5 text-purple-500" />,
      title: "Featured Game Opportunity",
      game: "All Games",
      time: "1 hour ago",
    },
    {
      type: "system",
      icon: <Settings className="w-5 h-5 text-gray-500" />,
      title: "System Maintenance Complete",
      game: "Platform Update",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="grid w-full gap-8 gap- md:grid-cols-1">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={mergeCssClass(
              "grid grid-cols-4 ",
              isMobile() ? "gap-1" : "gap-4"
            )}
          >
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(action.link);
                }}
                className={mergeCssClass(
                  isMobile() ? "p-1" : "p-4",
                  "flex flex-col  items-center  rounded-lg bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-400 transition-colors duration-200"
                )}
              >
                <div className="p-3 mb-2 rounded-full bg-blue-50">
                  {action.icon}
                </div>
                <div
                  className={mergeCssClass(
                    isMobile()
                      ? "font-semibold text-xs mb-1"
                      : "font-semibold text-sm mb-1"
                  )}
                >
                  {action.title}
                </div>
                {!isMobile() && (
                  <p className="text-xs text-center text-gray-500">
                    {action.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Activity Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityFeed.map((activity, index) => (
              <div
                key={index}
                className="flex items-start p-3 space-x-4 transition-colors duration-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.game}</p>
                </div>
                <span className="flex-shrink-0 text-xs text-gray-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
