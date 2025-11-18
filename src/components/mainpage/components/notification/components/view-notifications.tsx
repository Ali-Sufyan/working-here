import { CustomTablePage } from "@/components/utilities/custom-page-table";
import { useNavigate } from "react-router-dom";
import { notificationTableData } from "../functions";
import { FetchMiniLayoutDataStaffs } from "./notification-mini-layout";

export default function ViewNotifications() {
  const navigate = useNavigate();
  notificationTableData.fn.addFn = () => navigate("add");
  notificationTableData.show.addButton = false;
  return (
    <>
      {" "}
    

      <CustomTablePage
        tableData={notificationTableData}
        tableName="Notification Management"
        tableDescription="Manage all your notifications in one place"
        pageMiniLayout={<FetchMiniLayoutDataStaffs />}
        button={{
          buttonLabel: "Add New Notification",
          buttonIcon: undefined,
          buttonOnClick: "add",
        }}/>
    </>
  );
}
