/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { ColumnElementT, ColumnT, HeadingT, TableDataT } from "andrea-table";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { BASE_URL, tableColor } from "../../../../../app/config";
import { RoleResponseI, useDeleteRoleMutation } from "../../../../../app/services/roles/roles";
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
import { colorGenPlusOtherObjTailwind } from "../../../../utilities/color-gen";
import { colorScheme } from "../../../../utilities/color-scheme";
import DeleteModal from "../../../../utilities/crud/delete";
import CustomModal from "../../../../utilities/modal/modal";
import { capitalize } from "../../../../utilities/utils";


const BeautifyPermissions: React.FC<ColumnElementT<RoleResponseI>> = ({ columnData}) => {
  const data: string[] = columnData.permissions;
  const mapP: { permission: string }[] = data.map((e) => ({ permission: e }));

  const twColor = colorGenPlusOtherObjTailwind<{
    permission: string;
    color: string;
  }>(mapP, colorScheme.accent_1, "color", 100, 20, 20);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-[2px]">
        {twColor.slice(0, 10).map((p, k) => {
          const color = `text-[${p.color}]`;

          return (
            <Box
              sx={{ color: p.color }}
              key={k}
              className={`p-1 rounded whitespace-normal break-words font-medium  ${color}`}
            >
              {capitalize({ text: p.permission })}
            </Box>
          );
        })}
        <div className="p-1 rounded whitespace-normal text-[var(--secondary)] break-words font-medium ">
          + more
        </div>
      </div>
    </>
  );
};

const ActionHeader: React.FC<ColumnElementT<RoleResponseI>> = ({ columnData, onDeleteSuccess }) => {
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
          /*   dispatch(hideMiniLayout()); */
        }}
        className="btn-primary h-[5px] p-[6px] text-[14px]"
        to={`/role/${columnData.id}/edit`}
      >
        edit
      </NavLink>
      <NavLink
        onClick={() => {
          handleClick();
          /*      dispatch(hideMiniLayout()); */
        }}
        className="btn-secondary m-2 p-[6px] text-[14px]"
        to={`/role/${columnData.id}/view`}
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
    action: <ActionHeader columnData={{}} crud={{}} />,
    _permissions: <BeautifyPermissions columnData={{}} crud={{}} />,
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
    key: "name",
    name: "name",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "_permissions",
    name: "permissions",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "details",
    name: "details",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "createdAt",
    name: "created at",
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

export const roleTableData: TableDataT<any> = {
  baseUrl: BASE_URL,
  fn: {
    fetchFn: fetchData,
  },
  crud: {},
  heading: header,
  column: extraColumn,
  query: {},
  show: { seeMore: false, tableName: false, filters: false,checkBox:false, exports:true  },
  refresh: { intervalInSec: 100, status: false },
  subUrl: "/roles/roles",
  tableName: "roles",style:tableColor
};
