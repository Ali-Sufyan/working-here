/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mui/material";
import { useGetAllUsersStatisticsQuery } from "../../../../../app/services/statistics/statistics.query";
import { generateSingleColor } from "../../../../utilities/color-gen";
import { CustomChart } from "../../../../utilities/custom-chart";
import { myIcons } from "../../../../utilities/icons";
import Loading from "../../../../utilities/styles/loading";

export default function UserMiniLayout() {
  const { data, isLoading, isSuccess } = useGetAllUsersStatisticsQuery();

  return (
    <>
      {isLoading ? (
        <Loading size={40} transparent />
      ) : (
        isSuccess && <Users getRoles={data} />
      )}
    </>
  );
}
function Users(props: {
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
          <Grid item xs={4} key={index}>
            <CustomChart
              amount={item.count ?? 0}
              name={item.name ?? ""}
              avatar_color={generateSingleColor("hsl(90,70%, 50%)", 30, 20, 30)}
              show_currency={false}
              chart="bar"
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
