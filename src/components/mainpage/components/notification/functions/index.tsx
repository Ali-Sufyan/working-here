/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { INotification } from "@/app/services/notifications/notification.types";
import { ColumnElementT, ColumnT, HeadingT, TableDataT } from "andrea-table";
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


const ActionHeader:  React.FC<ColumnElementT<INotification>> = ({ columnData, onDeleteSuccess }) => {
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
          
onDeleteSuccess();}
if(isSuccess){
 dispatch(closeDeleteModal());
  toast.success("Role deleted successfully")
}
        }
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error(`${error}`);
    }
  };

  return (
    <div className="">
      {
        <CustomModal
          children={
            <DeleteModal
              props={{
                id: tableData.data.id,
                confirm: handleDelete,
                metadata: [`${tableData.data.name} Role`],
                isLoading: isLoading ?? false,
              }}
            />
          }
        />
      }

      {isSuccess && toast.success("Role deleted successfully")}
      {isError && toast.error("error occurred")}

      <NavLink
        onClick={() => {
          handleClick();
          /*      dispatch(hideMiniLayout()); */
        }}
        className="btn-secondary m-2 p-[6px] text-[14px]"
        to={`/notifications/${columnData.id}/view`}
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
async function fetchData({baseUrl, url}:{url: string, baseUrl: string}) {
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
const extraColumn: ColumnT<INotification>[] = [
  {
    action: <ActionHeader columnData={{}} crud={{}} />,
  },
];

const header: HeadingT<INotification>[] = [
  {
    key: "id",
    name: "ID",
    canSort: true,
    canFilter: false,
    canCopy: true,
  },
  {
    key: "createdAt",
    name: "Created At",
    canSort: true,
    canFilter: false,
  },
  {
    key: "title",
    name: "Title",
    canSort: true,
    canFilter: false,
  },

  {
    key: "viewed",
    name: "Viewed",
    canSort: true,
    canFilter: false,
  },
  {
    key: "type",
    name: "Type",
    canSort: true,
    canFilter: false,
  },
  {
    key: "action",
    name: "action",
    canSort: false,
    canFilter: false,
  },
];

export const notificationTableData:TableDataT<INotification> = {
  baseUrl: BASE_URL,
  fn: {
    fetchFn: fetchData,
  },
  crud: {},
  heading: header,
  column: extraColumn,
  query: {},
  show: { seeMore: false, tableName: false, filters: false, addButton: false },
  refresh: { intervalInSec: 100, status: false },
  subUrl: "/notification",
  tableName: "notification",
   style:tableColor
};
