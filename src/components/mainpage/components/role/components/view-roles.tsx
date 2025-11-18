import { CustomTablePage } from "@/components/utilities/custom-page-table";
import { roleTableData } from "../functions";
import { FetchMiniLayoutDataRoles } from "./role-mini-layout";

export function ViewRoles() {

  // roleTableData.fn.addFn = () => navigate("add");
  roleTableData.show.addButton = false;
  return (
    <>
      {" "}
      {/* <Grid container sx={{}} className="">
        <PageMiniLayout children={<FetchMiniLayoutDataRoles />} />

        <PageMajorLayout children={<NewTable data={roleTableData} />} />
      </Grid> */}

      <CustomTablePage
      
        tableData={roleTableData}
        tableName="Roles Management"
        tableDescription="Manage all your roles in one place"
        pageMiniLayout={<FetchMiniLayoutDataRoles />}
        button={{
          buttonLabel: "Add New Role",
          buttonIcon: undefined,
          buttonOnClick: "add",
        }}

      />
    </>
  );
}
