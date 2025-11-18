import { CustomTablePage } from "@/components/utilities/custom-page-table";
import { userTableData } from "../functions";

export function ViewUsers() {

  return (
    <>
      {" "}
    

      <CustomTablePage
        tableData={userTableData}
        tableName="User Management"
        tableDescription="Manage all your users in one place"
        button={{
          buttonLabel: "Add New User",
          buttonIcon: undefined,
          buttonOnClick: "add",
        }} />
    </>
  );
}
