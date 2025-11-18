
import { CustomTablePage } from "@/components/utilities/custom-page-table";
import { staffTableData } from "../functions";
import { FetchMiniLayoutDataStaffs } from "./staff-mini-layout";

export default function ViewStaffs() {
  // staffTableData.fn.addFn = () => navigate("add");
  staffTableData.show.addButton = false;
  return (
    <>
      {" "}
     

      <CustomTablePage
      
        tableData={staffTableData}
        tableName="Staff Management"
        tableDescription="Manage all your staff in one place"
        pageMiniLayout={<FetchMiniLayoutDataStaffs />}
        button={{
          buttonLabel: "Add New Staff",
          buttonIcon: undefined,
          buttonOnClick: "add",
        }}
      
      />
    </>
  );
}
