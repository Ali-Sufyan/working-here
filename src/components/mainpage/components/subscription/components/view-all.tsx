import { CustomTablePage } from "@/components/utilities/custom-page-table";
import { subscriptionTableData } from "../functions";



export default function ViewSubscriptions() {


  return (
    <>
      {" "}
    
      <CustomTablePage
        tableData={subscriptionTableData}
        tableName="Subscription Management"
        tableDescription="Manage all your subscriptions in one place"
      
        button={{
          buttonLabel: "Add New Subscription",
          buttonIcon: undefined,
          buttonOnClick: "/subscription/add",
        }}/>
    </>
  );
}