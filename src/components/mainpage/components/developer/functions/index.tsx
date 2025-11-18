/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteDevProfileByIdMutation, useUpdateDevProfileVerificationStatusMutation } from "@/app/services/dev-profile/dev.profile.query";
import { IDeveloperProfileFull } from "@/app/slices/branded/dev-profile/dev.profile.types";
import AllCustomModal from "@/components/utilities/modal/allModal";
import Loading from "@/components/utilities/styles/loading";
import { errorToast, successToast } from "@/components/utilities/toaster";
import { ColumnElementT, ColumnT, HeadingT, TableDataT } from "andrea-table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL, tableColor } from "../../../../../app/config";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../../app/slices/hooks";
import {
    closeDeleteModal,
    openDeleteModal,
    openSomeModal,
} from "../../../../../app/slices/modal/modal.types";
import {
    setClickCount,
    setTableData,
} from "../../../../../app/slices/tableDataActions/table-data-actions.types";
import { axiosSetup } from "../../../../utilities/axios-setup";
import DeleteModal from "../../../../utilities/crud/delete";
import CustomModal from "../../../../utilities/modal/modal";
import DeveloperProfile from "../components/view-developer";

const FullName: React.FC<ColumnElementT<any>> = ({ columnData }) => {
    console.log({ columnData });
  return `${columnData.userId?.firstName || ""} ${
    columnData.userId?.lastName || ""
  }`;
};


const STATUS_CONFIG = {
  SUSPENDED: {
    label: "Suspended",
    className: "bg-red-100 text-red-700",
  },
  PENDING: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
  },
  APPROVED: {
    label: "Verified",
    className: "bg-green-100 text-green-700",
  },
  REJECTED: {
    label: "Unverified",
    className: "bg-red-100 text-red-700",
  },
};

type VerificationStatus = "SUSPENDED" | "PENDING" | "APPROVED" | "REJECTED";

const VerificationStatus: React.FC<ColumnElementT<IDeveloperProfileFull>> = ({ columnData, onDeleteSuccess }) => {
  const [updateVerificationStatus,{isLoading, isSuccess,}] =
    useUpdateDevProfileVerificationStatusMutation();
    const [loading, setLoading] = useState({
        [columnData._id]: false,
    });


    useEffect(() => {
        if (isSuccess) {
            successToast("Verification status updated successfully");
            if (onDeleteSuccess) onDeleteSuccess();
        }
    }, [isSuccess, onDeleteSuccess]);
  const currentStatus: keyof typeof STATUS_CONFIG =
        columnData.verificationStatus || "PENDING";
    
  const statusConfig = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.PENDING;

  return (
    <div className="relative">
      <select
        value={currentStatus}
        onChange={(e) => {
          const newStatus = e.target.value as VerificationStatus;
          updateVerificationStatus({
            id: columnData._id,
            verificationStatus: newStatus,
          });
            setLoading({ ...loading, [columnData._id]: isLoading });
        }}
        className={`w-full p-2 rounded-md text-center appearance-none cursor-pointer
          ${statusConfig.className}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        <option value={currentStatus} className={statusConfig.className}>
          {statusConfig.label}
        </option>
        {(Object.keys(STATUS_CONFIG) as VerificationStatus[])
          .filter((status) => status !== currentStatus)
          .map((status) => (
            <option
              key={status}
              value={status}
              className={STATUS_CONFIG[status].className}
            >
              {STATUS_CONFIG[status].label }{loading[columnData._id] && isLoading   ? <Loading transparent size={12}/> : ""}
            </option>
          ))}
      </select>
    </div>
  );
};



const ActionHeader: React.FC<ColumnElementT<any>> = ({
  columnData,
  onDeleteSuccess,
}) => {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.tableData);
  const [del, { isSuccess, isError, isLoading }] = useDeleteDevProfileByIdMutation();


  useEffect(() => {
    if (isSuccess) {
      successToast("Profile deleted successfully");
      dispatch(closeDeleteModal());
    }
    if (isError) {
      errorToast("Error deleting profile");
    }
  }, [isSuccess, isError, ]);
  const handleDelete = async (id: string) => {
    try {
      if (tableData.click === 0) {
        const response = await del(id);

        if (response) {
          dispatch(setClickCount(1));
          if (onDeleteSuccess) {
            onDeleteSuccess();
          }
        }
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      successToast("Profile deleted successfully");
      dispatch(closeDeleteModal());
    }
    if (isError) {
      errorToast("Error deleting profile");
    }
  }, [isSuccess, isError, ]);

  return (
    <div className="space-y-4 my-5 space-x-2">
      <AllCustomModal

width="w-1/2 "

              children={
          <DeveloperProfile developerProfile={tableData.data as IDeveloperProfileFull} isEditable={true}  />
        
        
              }
        modalId="viewDeveloper"
      />

      <CustomModal>
        <DeleteModal
          props={{
            id: tableData.data.id,
            confirm: handleDelete,
            metadata: [`${tableData.data.companyName}`],
            isLoading: isLoading ?? false,
          }}
        />
      </CustomModal>
    
      <button
        className="btn-secondary p-2 text-sm"
              onClick={() => {
               dispatch(setTableData(columnData));
          dispatch(openSomeModal("viewDeveloper"));
        }}
      >
        View
      </button>
      <button
        className="btn-tertiary p-2 text-sm"
        onClick={() => {
          dispatch(setTableData(columnData));
          dispatch(setClickCount(0));
          dispatch(openDeleteModal());
        }}
      >
        Delete
      </button>
    </div>
  );
};

async function fetchData({ url, baseUrl }: { url: string; baseUrl: string }) {
  try {
    const axiosInstance = axiosSetup({ baseURL: baseUrl, authRoute: true });
    const response = await axiosInstance.get(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

const extraColumn: ColumnT<any>[] = [
  {
    action: <ActionHeader columnData={""} crud={{}} />,
    _fullName: <FullName columnData={""} crud={{}} />,
    _verificationStatus: <VerificationStatus columnData={{}} crud={{}} />,
   
  },
];

const header: HeadingT<any>[] = [
  {
    key: "_fullName",
    name: "Full Name",
    canSort: false,
    isHeader: true,
    canFilter: false,
  },
  
  {
    key: "_verificationStatus",
    name: "Verification Status",
    canSort: false,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "commissionRate",
    name: "Commission Rate (%)",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "totalRevenue",
    name: "Total Revenue",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "developerRating",
    name: "Rating",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  
  {
    key: "action",
    name: "Actions",
    canSort: false,
    isHeader: true,
    canFilter: false,
  },
];

export const developerProfileTableData: TableDataT<any> = {
  baseUrl: BASE_URL,
  fn: {
    fetchFn: fetchData,
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
  refresh: { intervalInSec: 120, status: false},
  subUrl: "/dev/profile/admin/get/all",
  tableName: "developers",
  style: tableColor,
};
