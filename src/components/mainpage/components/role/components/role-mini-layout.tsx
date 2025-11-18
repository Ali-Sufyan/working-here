import { Grid } from "@mui/material";
import {
  RoleResponseI,
  useGetRolesCountQuery,
} from "../../../../../app/services/roles/roles";
import { generateSingleColor } from "../../../../utilities/color-gen";
import { CustomDashboardItemWithChart } from "../../../../utilities/dash/utilities.dashboard";

import { PersonIcon } from "@radix-ui/react-icons";
import Loading from "../../../../utilities/styles/loading";
import { capitalize } from "../../../../utilities/utils";

export function FetchMiniLayoutDataRoles() {
  const { data, isSuccess, isLoading } = useGetRolesCountQuery();

  return (
    <>
      {isLoading ? (
        <Loading size={40} transparent />
      ) : (
        isSuccess && <RoleMiniLayout getRoles={data} />
      )}
    </>
  );
}
export default function RoleMiniLayout(props: {
  getRoles: Partial<RoleResponseI & { userCount: number }>[];
}) {
  //   //console.log(getRoles, " all roles by the user");
  return (
    <>
      <Grid container spacing={1} xs={12} md={12} lg={12}>
        <Grid item xs={6} md={6} lg={4} xl={3}>
          <CustomDashboardItemWithChart
            amount={props.getRoles.length}
            icon={<PersonIcon />}
            name={"total roles"}
            metadata={`${capitalize({ text: "total role count is" })} ${
              props.getRoles.length
            }`}
            avatar_color="hsl(180,90%, 20%)"
            show_currency={false}
          />
        </Grid>

        {props.getRoles.map((item, index) => (
          <Grid item xs={6} md={6} lg={4} xl={3} key={index}>
            <CustomDashboardItemWithChart
              amount={item.userCount ?? 0}
              icon={<PersonIcon />}
              name={item.name ?? ""}
              metadata={`${item.userCount} ${capitalize({
                text: `users with ${item.name} role`,
              })}`}
              avatar_color={generateSingleColor(
                "hsl(150,70%, 50%)",
                30,
                20,
                30
              )}
              show_currency={false}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

// {
//   name: "j",
//   uv: 4000,
//   pv: 2400,
//   amt: 2400,
// },
