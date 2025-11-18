/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { errorToast, successToast } from "@/components/utilities/toaster";
import { ColumnElementT, ColumnT, HeadingT, TableDataT, } from "andrea-table";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { BASE_URL, tableColor } from "../../../../../app/config";
import { useDeleteRoleMutation } from "../../../../../app/services/roles/roles";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../app/slices/hooks";
import {
  closeDeleteModal,
  openDeleteModal,
} from "../../../../../app/slices/modal/modal.types";
import {
  setClickCount,
  setTableData,
} from "../../../../../app/slices/tableDataActions/table-data-actions.types";
import { axiosSetup } from "../../../../utilities/axios-setup";
import DeleteModal from "../../../../utilities/crud/delete";
import CustomModal from "../../../../utilities/modal/modal";


const FullName: React.FC<ColumnElementT<any>> = ({ columnData }) => {
  return `${columnData.firstName} ${columnData.lastName}`;
};
const IsAuthenticated: React.FC<ColumnElementT<any>> = ({ columnData }) => {
  return (
    <>
      {columnData.isAuthenticated === true ? (
        <div className="bg-[var(--success-lightest)] text-[var(--success-darkest)] rounded-md">
          {String(columnData.isAuthenticated)}
        </div>
      ) : (
        <div className="bg-[var(--error-lightest)] text-[var(--error-darkest)] rounded-md">
          {String(columnData.isAuthenticated)}
        </div>
      )}
    </>
  );
};

const Email: React.FC<ColumnElementT<any>> = ({ columnData }) => {
  return `${
    columnData.userId &&
    columnData.userId?.email &&
    columnData.userId?.email
  } `;
};

const Role: React.FC<ColumnElementT<any>> = ({ columnData }) => {
  const role = columnData.role;
  return `${role}`;
};

const ActionHeader: React.FC<ColumnElementT<any>> = ({ columnData, onDeleteSuccess }) => {
  const dispatch = useAppDispatch();

  const tableData = useAppSelector((state) => state.tableData);
  const [del, { isSuccess, isError, isLoading }] = useDeleteRoleMutation();

  const handleClick = () => {};
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
      console.error("Error deleting role:", error);
      toast.error(`${error}`);
    }
  };
useEffect(() => {
  if (isSuccess) {
    successToast("Role deleted successfully");
    dispatch(closeDeleteModal());
  }
  if (isError) {
    errorToast("Error deleting role");
  }
}, [isSuccess, isError]);
  return (
    <div className="space-y-3">
      {
        <CustomModal
          children={
            <DeleteModal
              props={{
                id: tableData.data.id,
                confirm: handleDelete,
                metadata: [`${tableData.data.name}`],
                isLoading: isLoading ?? false,
              }}
            />
          }
        />
      }

     
      <NavLink
        onClick={() => {
          handleClick();
          /*   dispatch(hideMiniLayout()); */
        }}
        className="btn-primary h-[5px] p-[6px] text-[14px]"
        to={`/staff/${columnData.id}/edit`}
      >
        edit
      </NavLink>
      <NavLink
        onClick={() => {
          handleClick();
          /*      dispatch(hideMiniLayout()); */
        }}
        className="btn-secondary m-2 p-[6px] text-[14px]"
        to={`/staff/${columnData.id}/view`}
      >
        view
      </NavLink>
      <button
        className="btn-tertiary"
        onClick={() => {
          dispatch(setTableData(columnData));
          dispatch(setClickCount(0));
          dispatch(openDeleteModal());
        }}
      >
        delete
      </button>
    </div>
  );
  };

async function fetchData ({ url, baseUrl}:{ url: string, baseUrl: string}) {
  // const { token } = getLocalAuthData();

  // const axiosInstance = axios.create({
  //   baseURL: baseUrl,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //   },
  // });

  try {
    const c = axiosSetup({baseURL:baseUrl, authRoute:true});
    // const c = axiosInstance;

    const response = await c.get(url);

    return response.data.data;

    // dispatch({
    //   type: ActionTableTypesE.SET_REMOTE_DATA,
    //   payload: response.data.data,
    // });
  } catch (error) {
    //console.log(error);
  }
}
const extraColumn: ColumnT<any>[] = [
  {
    action: <ActionHeader columnData={""} crud={{}} />,
    _role: <Role columnData={""} crud={{}} />,
    _fullName: <FullName columnData={""} crud={{}} />,
    _email: <Email columnData={""} crud={{}} />,
    _isAuthenticated: <IsAuthenticated columnData={""} crud={{}} />,
   
  },
];
const header: HeadingT<any>[] = [
  {
    key: "id",
    name: "id",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "_fullName",
    name: "Full Name",
    canSort: false,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "position",
    name: "role",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "phoneNumber",
    name: "Phone Number",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "_email",
    name: "email",
    canSort: false,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "_isAuthenticated",
    name: "is authorized",
    canSort: false,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "hireDate",
    name: "Hire Date",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
 


  {
    key: "action",
    name: "action",
    canSort: false,
    isHeader: true,
    canFilter: false,
  },
];

export const staffTableData: TableDataT<any> = {
  baseUrl: BASE_URL,
  fn: {
    fetchFn: fetchData,
  },
  crud: {},
  heading: header,
  column: extraColumn,
  query: {},
  show: { seeMore: false, tableName: false, filters: false, exports:true, checkBox: false,  },
  refresh: { intervalInSec: 100, status: false },
  subUrl: "/staffs",
  tableName: "staffs",
  style:tableColor
};
