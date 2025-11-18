import InfoIcon from "@mui/icons-material/Info";
import { Box, Paper, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import NairaICon from "../../../assets/svg.icons";
import { customDashboardI } from "../../mainpage/components/interface.dashboard/interface.dashboard";

export const insertComma = (st: string | number) => {
  const vv = String(st)
  let n = Number(st);
  if(vv.includes('.')) {
    n = Number(st).toFixed(2) as unknown as number;
  }

  const str = String(n);
  const y = str.split(".");


  const v = y[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (y[1] &&y[1].length > 1) {
    

    if (v.length <= 10) return v + "." + String(y[1]);
    else if (v.length > 10) return v.slice(0, 10) + "+";
  }
  return v;
};

export function CustomDashboardItems({
  amount,
  icon,
  metadata,
  name,
  avatar_color,
}: customDashboardI) {
  return (
    <>
      <Box sx={{ position: "relative" }} className="hover:shadow-sm">
        <Paper
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            height: 100,
          }}
        >
          <Box
            sx={{
              overflow: "hidden",

              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              "& .icon": {
                color: (theme) =>
                  theme.palette.mode === "dark" ? "inherit" : "#dc2440",
              },
            }}
          >
            {" "}
            <Box>
              <Avatar
                sx={{
                  background: `${avatar_color}`,
                  width: 60,
                  height: 60,
                }}
              >
                {icon}
              </Avatar>
            </Box>{" "}
            <Box textAlign="center">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <InfoIcon
                  className="info-when-hover"
                  sx={{ fontSize: 20, color: "hsl(120, 50%, 50%)" }}
                />
                <Paper elevation={2} className="popover-content">
                  <Box sx={{ opacity: 1 }}>{metadata}</Box>
                </Paper>{" "}
                <Typography
                  className="bg-[var(--primary)]"
                  color="textSecondary"
                  sx={{
                    textTransform: "capitalize",
                    position: "relative",
                    fontSize: 12,
                    fontWeight: 500,
                    p: -1,
                  }}
                >
                  {name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <NairaICon />
                <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                  {amount || " "}
                </Typography>
              </Box>
              <Typography color="textSecondary" sx={{ fontSize: 12 }}>
                {metadata || " "}
              </Typography>
              <div>
                {/* 
              {Object.entries(metadata).forEach(([key, value]) => {
                return (
                  <>
                    <Typography variant="h6" color="initial">
                      {key}: {value}
                    </Typography>
                  </>
                );
              })} */}
              </div>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export function CustomDashboardItemWithChart({
  amount,
  icon,
  name,
  avatar_color,
  show_currency,
  chart,
  metadata,
}: customDashboardI) {
  const money = insertComma(amount);
  return (
    <>
      <Paper
        sx={{
          height: chart ? "auto" : 120,
          borderRadius: 2,
          
        }}
        className="hover:shadow-sm"
      >
        <Box
          sx={{
            px:'15px',
            py:'10px',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "normal",
            "& .icon": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "inherit" : "#dc2440",
            },
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              px: 1,

              my: 1,
            }}
          >
            {" "}
            <Box
              sx={{
                display: "flex",

                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Box
                className="capitalize text-[var(--primary\_darkest)]"
                color={""}
                fontWeight={600}
                fontSize={"12px"}
              >
                {name}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                {" "}
                {show_currency && (
                  <div className="font-semibold text-[20px] ">$</div>
                )}
                <Box
                  sx={{ fontWeight: "600" }}
                  className="sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[28px]   text-[var(--dark\_0)]"
                >
                  {money}
                </Box>
                
              </Box>
                <Box className=" pl-2 text-[var(--gray-6)] text-[12px] transition ease-in-out delay-150">
                  {metadata}
                </Box>
            </Box>
            <Box className="custom_submerged_gray p-[2px] w-[40px] h-[40px]">
              <Avatar
                sx={{
                  background: `${avatar_color}`,
                  maxWidth: 40,
                  maxHeight: 40,
                }}
              >
                {icon}
              </Avatar>
            </Box>
          </Box>
          {chart && (
            <Box className="transition ease-in-out delay-150">{chart}</Box>
          )}
        </Box>
      </Paper>
    </>
  );
}
