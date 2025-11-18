/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mui/material";
import { generateSingleColor } from "../../../../utilities/color-gen";

import { useGetAllNotificationStatisticsQuery } from "../../../../../app/services/statistics/statistics.query";
import { CustomChart } from "../../../../utilities/custom-chart";
import { myIcons } from "../../../../utilities/icons";
import Loading from "../../../../utilities/styles/loading";

export function FetchMiniLayoutDataStaffs() {
  // const { data, isSuccess, isLoading } = useGetRolesCountQuery();

  const { data, isLoading, isSuccess } = useGetAllNotificationStatisticsQuery();

  return (
    <>
      {isLoading ? (
        <Loading size={40} transparent />
      ) : (
        isSuccess && <Notifications getRoles={data} />
      )}
    </>
  );
}
function Notifications(props: {
  getRoles: Partial<{
    name: string;
    count: number;
    type: string;
    details: string;
    weeklyReport: Record<string, any>[];
  }>[];
}) {
  return (
    <>
      <Grid container spacing={1} xs={12} md={12} lg={12}>
        {props.getRoles.map((item, index) => (
          <Grid item xs={6} md={6} lg={4} xl={3} key={index}>
            <CustomChart
              amount={item.count ?? 0}
              name={item.name ?? ""}
              avatar_color={generateSingleColor("hsl(30,70%, 50%)", 30, 20, 30)}
              show_currency={false}
              chart="none"
              data={item.weeklyReport ?? []}
              show_chart={false}
              icon={
                <div className={"h-6 w-6"}>
                  <myIcons.InformationIcon />
                </div>
              }
              metadata={item.details ?? ""}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
