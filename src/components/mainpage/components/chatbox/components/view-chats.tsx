import { CustomTablePage } from "@/components/utilities/custom-page-table";
import { chatTableData } from "../functions";

export default function ViewChats () {
  
  chatTableData.show.addButton = false;

  return (
    <>
      {" "}
     

      <CustomTablePage
        tableData={chatTableData}
        tableName="Chat Management"
        tableDescription="Manage all your chats in one place"
       
      />
    </>
  );
}
