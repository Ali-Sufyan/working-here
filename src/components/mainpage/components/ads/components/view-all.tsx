import { CustomTablePage } from "@/components/utilities/custom-page-table"
import { adPlacementTableData } from "../functions"




export default function ViewAds(){
    return (
        <>
          {" "}
          <CustomTablePage
            tableData={adPlacementTableData}
            tableName="Ads Management"
            tableDescription="Manage all your ads in one place"
       
            button={{
              buttonLabel: "Add New Ad",
              buttonIcon: undefined,
              buttonOnClick: "add",
            }}
          />
        </>
    )
}