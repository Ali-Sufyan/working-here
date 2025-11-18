/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { useLazyDeleteUserQuery } from "@/app/services/users/user.query";
import { IUser } from "@/app/slices/branded/dev-profile/dev.profile.types";
import { ColumnElementT, ColumnT, HeadingT, TableDataT, } from "andrea-table";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { BASE_URL, tableColor } from "../../../../../app/config";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../app/slices/hooks";
import { openDeleteModal } from "../../../../../app/slices/modal/modal.types";
import {
  setClickCount,
  setTableData,
} from "../../../../../app/slices/tableDataActions/table-data-actions.types";
import { axiosSetup } from "../../../../utilities/axios-setup";
import DeleteModal from "../../../../utilities/crud/delete";
import CustomModal from "../../../../utilities/modal/modal";


export function AddUserRoute() {
  window.location.href = "/user/add";
  //   return <Navigate to="/user/add" />;
}


const ActionHeader: React.FC<ColumnElementT<IUser>> = ({ columnData, onDeleteSuccess }) => {
  const dispatch = useAppDispatch();

  const tableData = useAppSelector((state) => state.tableData);
  const [del] = useLazyDeleteUserQuery();

  const handleClick = () => {};
  const handleDelete = async (id: string) => {


    try {
      if (tableData.click === 0) {
        await del(id);

        dispatch(setClickCount(1)); // Assuming this is used for disabling the button
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(`${error}`);
    }
  };

  return (
    <div className="space-y-2 my-3">
      {
        <CustomModal
          children={
            <DeleteModal
              props={{
                id: tableData.data.id,
                confirm: handleDelete,
                metadata: [
                  `${tableData.data.firstName} ${tableData.data.lastName}`,
                ],
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
        to={`/user/${columnData.id}/edit`}
      >
        edit
      </NavLink>
      <NavLink
        onClick={() => {
          handleClick();
          /*      dispatch(hideMiniLayout()); */
        }}
        className="btn-secondary m-2 p-[6px] text-[14px]"
        to={`/user/${columnData.id}/view`}
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
async function fetchData ({ baseUrl, url}:{url: string, baseUrl: string}) {
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

    return response.data.results;

    // dispatch({
    //   type: ActionTableTypesE.SET_REMOTE_DATA,
    //   payload: response.data.data,
    // });
  } catch (error) {
    //console.log(error);
  }
}
const extraColumn: ColumnT<IUser>[] = [
  {
    action: <ActionHeader columnData={{}} crud={{}} />,
  },
];
const header: HeadingT<IUser>[] = [
  {
    key: "id",
    name: "id",
    canSort: true,
    isHeader: true,
    canFilter: false,
    canCopy: true,
  },
  {
    key: "firstName",
    name: "first name",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "lastName",
    name: "last name",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "email",
    name: "email",
    canSort: true,
    isHeader: true,
    canCopy: true,
    canFilter: false,
  },

  {
    key: "createdAt",
    name: "created at",
    canSort: true,
    isHeader: true,
    canFilter: true,
  },
  {
    key: "calendarFilter",
    name: "calendar",
    canSort: false,
    isHeader: false,
    canFilter: true,
  },
  {
    key: "action",
    name: "action",
    canSort: false,
    isHeader: true,
    canFilter: false,
  },
];

export const userTableData: TableDataT<IUser> = {
  baseUrl: BASE_URL,
  fn: {
    fetchFn: fetchData,
  },
  crud: {},
  heading: header,
  column: extraColumn,
  query: {},
  show: { seeMore: false, tableName: false, exports:true, filters:false, checkBox: false, addButton: false },
  refresh: { intervalInSec: 100, status: true },
  subUrl: "/users/",
  tableName: "user",
  style:tableColor
};
