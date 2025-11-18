/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL, tableColor } from "@/app/config";
import { useDeleteSubscriptionMutation } from "@/app/services/subscription/query";
import { SubscriptionResponseI } from "@/app/services/subscription/types";
import { useAppDispatch, useAppSelector } from "@/app/slices/hooks";
import { closeDeleteModal, closeSomeModal, openSomeModal } from "@/app/slices/modal/modal.types";
import { setClickCount, setTableData } from "@/app/slices/tableDataActions/table-data-actions.types";
import { axiosSetup } from "@/components/utilities/axios-setup";
import DeleteModal from "@/components/utilities/crud/delete";
import AllCustomModal from "@/components/utilities/modal/allModal";
import { errorToast, successToast } from "@/components/utilities/toaster";
import { StatusUi } from "@/components/utilities/utils";
import { ColumnElementT, ColumnT, HeadingT, TableDataT } from "andrea-table";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import SubscriptionForm from "../components/view-one";

const header: HeadingT<SubscriptionResponseI>[] = [
  {
    key: "planName",
    name: "Plan Name",
    canSort: true,
    isHeader: true,
    canFilter: true,
  },
  {
    key: "planType",
    name: "Plan Type",
    canSort: true,
    isHeader: true,
    canFilter: true,
  },
  {
    key: "_prices",
    name: "Prices",
    canSort: true,
    isHeader: true,
    canFilter: true,
  },
  {
    key: "features",
    name: "Features",
    canSort: false,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "_active",
    name: "Status",
    canSort: true,
    isHeader: true,
    canFilter: true,
  },
  
  {
    key: "action",
    name: "Actions",
    canSort: false,
    isHeader: true,
    canFilter: false,
  },
];

const ActiveStatus: React.FC<ColumnElementT<SubscriptionResponseI>> = ({
  columnData,
}) => {
  const statusConfig = columnData.active as string;

  return <StatusUi status={statusConfig} />;
};

const Prices: React.FC<ColumnElementT<SubscriptionResponseI>> = ({
  columnData,
}) => {
  const statusConfig = columnData.prices;

  return (
    <>
      <div className=" font-semibold text-gray-700 mb-2">
        {" "}
        {statusConfig.monthly} USD monthly{" "}
      </div>

      <div className=" font-semibold text-gray-700 mb-2">
        {" "}
        {statusConfig.annual} USD annually{" "}
      </div>
    </>
  );
};

 

const Features: React.FC<ColumnElementT<SubscriptionResponseI>> = ({
  columnData,
}) => {
  return (
    <div className="flex flex-wrap gap-1">
      {(columnData?.features as string[]).map((feature, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
        >
          {feature}
        </span>
      ))}
    </div>
  );
};

const ActionHeader: React.FC<ColumnElementT<SubscriptionResponseI>> = ({
  columnData,onDeleteSuccess
}) => {
 

  //   const handleDelete = async (id: string) => {
  //     try {
  //       // Implement delete logic here
  //       if (onDeleteSuccess) onDeleteSuccess();
  //     } catch (error) {
  //       console.error("Error deleting subscription:", error);
  //     }
  //   };

   const dispatch = useAppDispatch();

   const tableData = useAppSelector((state) => state.tableData);
   const [del, { isSuccess, isError, isLoading }] =
     useDeleteSubscriptionMutation();
   function onSuccess() {
     if (onDeleteSuccess) onDeleteSuccess();
     dispatch(closeSomeModal("viewSubscription"));
   }
   const handleDelete = async (id: string) => {
     // //console.log("hello world handle click", columnData, "and", crud);
     // //console.log("hello world handle delete", tableData, "and", crud);

     try {
       if (tableData.click === 0) {
         const f = await del(id);

         if (f) {
           dispatch(setClickCount(1)); // Assuming this is used for disabling the button
           if (onDeleteSuccess) {
             onDeleteSuccess();
           }

           if (isSuccess) {
             dispatch(closeDeleteModal());
           }
         }
       }
     } catch (error) {
       toast.error(`${error}`);
     }
   };
   useEffect(() => {
     if (isSuccess) {
       successToast("subscription deleted successfully");
       dispatch(closeSomeModal("deleteSubscription"));
     }
     if (isError) {
       errorToast("Error deleting ad");
     }
   }, [isSuccess, isError]);

  return (
    <div className="space-y-4 my-5 space-x-2">
      <AllCustomModal
        modalId="deleteSubscription"
        children={
          <DeleteModal
            props={{
              id: tableData.data._id,
              confirm: handleDelete,
              metadata: [`${tableData.data.planName}`],
              isLoading: isLoading ?? false,
            }}
          />
        }
      />
      <AllCustomModal
        children={
          <div className="max-h-[650px] overflow-scroll">
            <SubscriptionForm
              initialData={tableData.data as any}
              onSuccess={onSuccess}
            />
          </div>
        }
        modalId="viewSubscription"
        width="w-[600px]"
      />
      <button
        className="btn-secondary p-2 text-sm"
        onClick={() => {
          dispatch(setTableData(columnData));
          dispatch(openSomeModal("viewSubscription"));
        }}
      >
        View
      </button>
      <button
        className="btn-tertiary p-2 text-sm"
        onClick={() => {
          dispatch(setTableData(columnData));
          dispatch(openSomeModal("deleteSubscription"));
        }}
      >
        Delete
      </button>
    </div>
  );
};
const extraColumn: ColumnT<SubscriptionResponseI>[] = [
  {
    _active: <ActiveStatus columnData={{}} />,
    _features: <Features columnData={{}} />,
    action: <ActionHeader columnData={{}} />,
    _prices: <Prices columnData={{}} />,
  },
];
async function fetchSubscriptionData({
  url,
  baseUrl,
}: {
  url: string;
  baseUrl: string;
}) {
  try {
    const axiosInstance = axiosSetup({ baseURL: baseUrl, authRoute: true });
    const response = await axiosInstance.get(url);    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export const subscriptionTableData: TableDataT<SubscriptionResponseI> = {
  baseUrl: BASE_URL,
  fn: {
    fetchFn: fetchSubscriptionData,
  },
  crud: {},
  heading: header,
  column: extraColumn,
  query: {},
  show: {
    seeMore: false,
    tableName: false,
    filters: false,
    exports: true,
    checkBox: false,
    addButton: false
  },
  refresh: { intervalInSec: 120, status: false },
  subUrl: "/subscription/get",
  tableName: "subscriptions",
  style: tableColor,
};
