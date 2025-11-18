/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL, tableColor } from "@/app/config";
import { useDeleteAdPlacementMutation } from "@/app/services/ads/query";
import { IAdPlacement } from "@/app/services/ads/types";
import { useAppDispatch, useAppSelector } from "@/app/slices/hooks";
import { closeDeleteModal, closeSomeModal, openSomeModal } from "@/app/slices/modal/modal.types";
import { setClickCount, setTableData } from "@/app/slices/tableDataActions/table-data-actions.types";
import { axiosSetup } from "@/components/utilities/axios-setup";
import DeleteModal from "@/components/utilities/crud/delete";
import AllCustomModal from "@/components/utilities/modal/allModal";
import { errorToast, successToast } from "@/components/utilities/toaster";
import { StatusUi } from "@/components/utilities/utils";
import { ColumnElementT, ColumnT, HeadingT, TableDataT } from "andrea-table";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { AdPlacementForm } from "../components/view-one";

const header: HeadingT<IAdPlacement>[] = [
  {
    key: "adName",
    name: "Ad Name",
    canSort: true,
    isHeader: true,
    canFilter: true,
  },
  {
    key: "adType",
    name: "Ad Type",
    canSort: true,
    isHeader: true,
    canFilter: true,
  },
  {
    key: "platform",
    name: "Platform",
    canSort: true,
    isHeader: true,
    canFilter: true,
  },
  {
    key: "placementLocation",
    name: "Placement Location",
    canSort: true,
    isHeader: true,
    canFilter: true,
  },
 
  {
    key: "estimatedRevenue",
    name: "Estimated Revenue",
    canSort: true,
    isHeader: true,
    canFilter: true,
  },
  {
    key: "_status",
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

const ActionHeader: React.FC<ColumnElementT<IAdPlacement>> = ({
  columnData,onDeleteSuccess

}) => {
  const dispatch = useAppDispatch();

  const tableData = useAppSelector((state) => state.tableData);
  const [del, { isSuccess, isError, isLoading }] = useDeleteAdPlacementMutation();
  function onSuccess () {
   if(onDeleteSuccess) onDeleteSuccess()
    dispatch(closeSomeModal("viewAdPlacement"));
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
      successToast("ads deleted successfully");
      dispatch(closeSomeModal("deleteAdPlacement"));
    }
    if (isError) {
      errorToast("Error deleting ad");
    }
  }, [isSuccess, isError]);
//   const handleDelete = async (id: string) => {
//     try {
//       // Implement delete logic here
//       if (onDeleteSuccess) onDeleteSuccess();
//     } catch (error) {
//       console.error("Error deleting ad placement:", error);
//     }
  //   };
  

  return (
    <div className="space-y-4 my-5 space-x-2">
      <AllCustomModal
        modalId="deleteAdPlacement"
        children={
          <DeleteModal
            props={{
              id: tableData.data._id,
              confirm: handleDelete,
              metadata: [`${tableData.data.adName}`],
              isLoading: isLoading ?? false,
            }}
          />
        }
      />
      <AllCustomModal
        children={
          <div className="max-h-[650px] overflow-scroll">
            <AdPlacementForm initialData={tableData.data as any}  onSuccess={onSuccess}/>
          </div>
        }
        modalId="viewAdPlacement"
        width="w-[600px]"
      />
      <button
        className="btn-secondary p-2 text-sm"
        onClick={() => {
          dispatch(setTableData(columnData));
          dispatch(openSomeModal("viewAdPlacement"));
        }}
      >
        View
      </button>
      <button
        className="btn-tertiary p-2 text-sm"
        onClick={() => {
          dispatch(setTableData(columnData));
          dispatch(setClickCount(0));

          dispatch(openSomeModal('deleteAdPlacement'));
        }}
      >
        Delete
      </button>
    </div>
  );
};
const ActiveStatus: React.FC<ColumnElementT<IAdPlacement>> = ({
  columnData,
}) => {
  const statusConfig = columnData.status as string;

  return <StatusUi status={statusConfig} />;
};
const extraColumn: ColumnT<IAdPlacement>[] = [
  {
    action: <ActionHeader columnData={{}} crud={{}} />,
    _status: <ActiveStatus columnData={{}} />,
  },
];

async function fetchAdPlacementData({
  url,
  baseUrl,
}: {
  url: string;
  baseUrl: string;
}) {
  try {
    const axiosInstance = axiosSetup({ baseURL: baseUrl, authRoute: true });
    const response = await axiosInstance.get(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}
export const adPlacementTableData: TableDataT<IAdPlacement> = {
  baseUrl: BASE_URL,
  fn: {
    fetchFn: fetchAdPlacementData,
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
      addButton: false,
    
  },
  refresh: { intervalInSec: 120, status: false },
  subUrl: "/ads/get",
  tableName: "adPlacements",
  style: tableColor,
};
