import { CustomTablePage } from "@/components/utilities/custom-page-table";
import { developerProfileTableData } from "../functions";

export function ViewDevelopers() {
  
  return (
    <>
      {" "}
      
      <CustomTablePage
      
        tableData={developerProfileTableData}
        tableName="Developers Management"
        tableDescription="Manage all your developers in one place"
        
      />
    </>
  );
}
