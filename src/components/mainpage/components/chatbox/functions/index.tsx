/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { useEffect } from 'react';
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { BASE_URL, tableColor } from "../../../../../app/config";
import {
  useAddStaffToChatMutation,
  useCloseChatMutation,
} from "../../../../../app/services/chats/chats";
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
import { myIcons } from "../../../../utilities/icons";
import CustomModal from "../../../../utilities/modal/modal";
import Loading from '../../../../utilities/styles/loading';
import { getLocalUserData } from '../../../../utilities/utils';

import { ChatI } from '@/app/services/chats/query';
import { ColumnElementT, ColumnT, HeadingT, TableDataT } from 'andrea-table';
import { GetUserById } from "../../../shared/utils/getUser";

const ActionHeader: React.FC<ColumnElementT<ChatI>> = ({ columnData, onDeleteSuccess }) => {
  const dispatch = useAppDispatch();



  const tableData = useAppSelector((state) => state.tableData);
  const user = getLocalUserData()
  const [del, { isSuccess, isError, isLoading }] = useDeleteRoleMutation();
  const [addStaff, { isSuccess: isSuccessAdd, isError: isErrorAdd }] = useAddStaffToChatMutation();
  const [closeChat, { isSuccess: isSuccessClose, isLoading:isLoadingClose, isError: isErrorClose, error:errorClose }] =
    useCloseChatMutation();
  useEffect(() => {
if(isSuccessClose)toast.success('successfully closed chat')
if(isErrorClose){
  console.log({errorClose})
  toast.error(
  errorClose && errorClose?.data?.message  ?`${ errorClose?.data?.message }`: "error occurred while closing chat")}

    if (isSuccessAdd) toast.success(`dear ${user.firstName} you are now handling the conversation with this client`);
    if (isErrorAdd) toast.error("error occurred");
    if (isSuccess) toast.success("Role deleted successfully");
    if (isError) toast.error("error occurred");
  }, [isSuccess, isError, isSuccessClose, isErrorClose, isSuccessAdd, isErrorAdd]);

  const handleAddStaff = async () => {

    try {
await addStaff({chatId:columnData._id, staffId:user.id})

     } catch (e) {
      //console.log(e)
    }
  };
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
    <div>
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

      <div className="flex flex-row align-middle items-center">
        {" "}
   { columnData?.staff && columnData?.staff.length > 0 &&    <button
          onClick={async () => {
       

           await closeChat(columnData._id)
            /*      dispatch(hideMiniLayout()); */
          }}
          className="btn-secondary  m-2 p-[2px] text-[14px]"
        >
        {isLoadingClose?<Loading size={32} />: <div> close</div>}
        </button>}

        <NavLink
          onClick={() => {

            if (columnData?.staff && columnData?.staff.length < 1) handleAddStaff();
            /*      dispatch(hideMiniLayout()); */
          }}
          className=" h-8 w-8 text-[var(--accent-1)] text-[12px] px-1"
          to={`/chat/${columnData._id}/view`}
        >
          <myIcons.Eye />
        </NavLink>
        <div
          className="text-[var(--error-light)] w-8 h-8 text-[12px] px-1"
          onClick={() => {
            dispatch(setTableData(columnData));
            dispatch(setClickCount(0));
            dispatch(openDeleteModal());
          }}
        >
          <myIcons.TrashIcon />
        </div>
      </div>
    </div>
  );
};


const HandledBy: React.FC<ColumnElementT<ChatI>> = ({ columnData }) => {
  return (
    <>
      {columnData.staff && columnData?.staff[0]?.handledBy ? (
        <GetUserById userId={columnData?.staff[0].handledBy} />
      ) : null}
    </>
  );
};

const User: React.FC<ColumnElementT<ChatI>> = ({ columnData }) => {
  return (
    <>{columnData.userId ? <GetUserById userId={columnData.userId} /> : null}</>
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
const extraColumn: ColumnT<ChatI>[] = [
  {
    action: <ActionHeader columnData={{}} crud={{}} />,
    _handledBy: <HandledBy columnData={{}} crud={{}} />,
    _userId: <User columnData={{}} crud={{}} />,
  },
];

const header: HeadingT<ChatI>[] = [
  {
    key: "_id",
    name: "ID",
    canSort: true,
    isHeader: true,
    canFilter: false,
    canCopy: true,
  },
  {
    key: "_userId",
    name: "user",
    canSort: true,
    isHeader: true,
    canFilter: false,
    canCopy: true,
  },
  {
    key: "createdAt",
    name: "Created At",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "_handledBy",
    name: "handled by",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },
  {
    key: "title",
    name: "Title",
    canSort: true,
    isHeader: true,
    canFilter: false,
  },

  {
    key: "ref",
    name: "reference",
    canSort: true,
    isHeader: true,
    canFilter: true,
  },
  {
    key: "isClosed",
    name: "is closed",
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

export const chatTableData:TableDataT<ChatI> = {
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
  subUrl: "/chats",
  tableName: "chat",
  style:tableColor
};
