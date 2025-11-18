/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateMessageMutation, useGetChatByIdQuery, useGetMessagesByChatIdQuery, useTransferChatMutation } from "../../../../../app/services/chats/chats";
import { ChatI, MessagesI, StaffChatT } from "../../../../../app/services/chats/query";
import { useLazyGetUserQuery } from "../../../../../app/services/users/user.query";
import { UserI } from "../../../../../app/slices/branded/user/user.types";

import { useGetStaffQuery } from "../../../../../app/services/staff/staff.query";
import { StaffResponseI } from "../../../../../app/services/staff/staff.types";
import { useAppDispatch } from "../../../../../app/slices/hooks";
import { openSomeModal } from "../../../../../app/slices/modal/modal.types";
import { colorScheme } from "../../../../utilities/color-scheme";
import { CreateCrud } from "../../../../utilities/crud/gen/components/create";
import { SubmitCrud } from "../../../../utilities/crud/gen/components/submit";
import { ViewCrud } from "../../../../utilities/crud/gen/components/view";
import {
  CRUCategoriesI,
  CRUHeadingI,
  CruI,
} from "../../../../utilities/crud/gen/interface.gen";
import { Input } from "../../../../utilities/forms/input";
import { myIcons } from "../../../../utilities/icons";
import AllCustomModal from "../../../../utilities/modal/allModal";
import Loading from "../../../../utilities/styles/loading";
import { convertDateFormat } from "../../../../utilities/time-magic";
import { capitalize, getLocalUserData, isMobile, mergeCssClass } from "../../../../utilities/utils";


export const ChatCategories: CRUCategoriesI[] = [
  { key: "user", name: "user" },
  { key: "details", name: "details" },

];
export const ChatHeadings: CRUHeadingI[] = [
  {
    key: "userId",
    name: "User ID",
    formType: "obj",
    isToggle: false,
    placeholder: "",
    prefixIcons: <myIcons.IconCardImage />,
    category: "user", // Assuming user ID relates to the order
    child: [
      {
        key: "firstName",
        name: "First Name",
        formType: "text",
        isToggle: false,

        placeholder: "",
        prefixIcons: <myIcons.UserBold />,
        category: "user",
      },
      {
        key: "lastName",
        name: "Last Name",
        formType: "text",
        isToggle: false,

        placeholder: "",
        prefixIcons: <myIcons.UserBold />,
        category: "user",
      },
      {
        key: "email",
        name: "Email",
        formType: "text",
        isToggle: false,

        placeholder: "",
        prefixIcons: <myIcons.UserBold />,
        category: "user",
      },
    ],
  },

  {
    key: "type",
    name: "Type",
    formType: "text",
    isToggle: false,
    placeholder: "",
    prefixIcons: <myIcons.MessageIcon />,
    category: "details", // PIN relates to security
  },
  {
    key: "ref",
    name: "Reference",
    formType: "text",
    isToggle: false,
    placeholder: "",
    prefixIcons: <myIcons.MessageIcon />,
    category: "details", // PIN relates to security
  },
  {
    key: "updatedAt",
    name: "date updated",
    formType: "date",
    isToggle: false,
    placeholder: "",
    prefixIcons: <myIcons.MessageIcon />,
    category: "details", // PIN relates to security
  },
 
  {
    key: "title",
    name: "Title",
    formType: "number",
    isToggle: false,
    placeholder: "0.00",
    prefixIcons: <myIcons.MessageIcon />,
    category: "details", // Credit amount also relates to the financial aspect
  },

  {
    key: "isClosed",
    name: "is Closed",
    formType: "toggle",
    isToggle: true,
    placeholder: "0.00",
    prefixIcons: <myIcons.MessageIcon />,
    category: "details", // Credit amount also relates to the financial aspect
  },
];


function TransferChat ({ chatId }: { chatId: string }) {


  const { data, isLoading } = useGetStaffQuery()

  return isLoading ? <Loading size={40} transparent /> :data? <TransferX staffs={data} chatId={  chatId} />:<></>


}

function TransferX ({ staffs,chatId }: { staffs: StaffResponseI[]; chatId: string }){
const transferCategory: CRUCategoriesI[] = [
  {
    key: "details", name:"transfer chat"}
]
const [transfer, {isLoading:isL,isSuccess:isS,isError:isE}] = useTransferChatMutation()

const transferHeading:CRUHeadingI[]=[

  
  {
    key: "transferredTo",
    name: "transfer to",
    formType: "select",
    isToggle: false,
    placeholder: "select staff",
    kv:  staffs.reduce((accumulator, item) => {
  // Copy the accumulator object to avoid mutating it
  const updatedAccumulator: Record<string, string> = { ...accumulator };

  // Add the current staff's id and firstName to the accumulator object
  updatedAccumulator[`${item.firstName}-${item.lastName}-${item.userId.email}`] = item.userId['id'];

  return updatedAccumulator;
}, {}),
    prefixIcons: <myIcons.MessageIcon />,
    category: "details", // Credit amount also relates to the financial aspect
  },]
  async function create(
    data: any
  ): Promise<"isLoading" | "isSuccess" | "isError" | "none"> {
 
    const dat = {handledBy:data.transferredTo, chatId:chatId, ...data}
    await transfer(dat);
    return isL ? "isLoading" : isE ? "isError" : isS ? "isSuccess" : "none";
  }
  const dat: CruI = {
    type: "CREATE",
    headings: transferHeading,
    categories: transferCategory,
    data: {},
    name: "chat",create: {
      create,
      createStatus: isL ? "loading" : isE ? "error" : isS ? "success" : "none",
    },
    icon: <myIcons.IconCommentSms />,
    id: chatId ?? '',
    buttonName: "Transfer",
    showButton: {
      deleteButton: true,
    },
    
  };
  return (<div className='flex flex-col'>
    <CreateCrud data={dat} />
    <SubmitCrud   data={dat} />
  </div>)

}
export function ViewChat() {
  const { chatId } = useParams<{ chatId: string }>();
  const { data, isLoading, isError, isSuccess, error } =
    useGetChatByIdQuery(chatId!);
  const { data:data2 } = useGetMessagesByChatIdQuery(chatId!, {
   
  });
  const [d, setD] = useState<
    Omit<ChatI, "userId"> & { userId: Partial<UserI> | undefined }
  >();
const getLoggedInUser =  getLocalUserData()
  const [user, status] = useLazyGetUserQuery();
    const dispatch = useAppDispatch();

  useEffect(() => {
    async function getter() {
      if (isSuccess) {
        const userx = (await user(data.userId)) ?? "";

        setD({
          ...data,

          userId: userx.data,
        });
      }
    }
    getter();
  }, [data, isSuccess, user]);

  const dat: CruI = {
    type: "VIEW",
    headings: ChatHeadings,
    categories: ChatCategories,
    data: isSuccess && status.isSuccess ? d! : {},
    name: "chat",
    icon: <myIcons.IconCommentSms/>,
    id: isSuccess ? data.id : "",
    showButton: {
      deleteButton: true,
    },
  };
 const showHeading =true;
  return (
    <>
      <AllCustomModal
        modalId={"show-messages-details"}
        children={data ? <ChatPopUp chat={data} /> : <></>}
      />
      <div className={showHeading ? "mt-10" : ""}>
        <Grid container>
          {showHeading && <Grid item xs md sm xl lg></Grid>}

          <Grid xs={12} sm={12} lg={12} md={12} xl={12}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: !showHeading ? "none" : "0px",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
                placeItems: "normal",
                borderTop: !showHeading ? 0 : 4,
                borderColor: !showHeading ? "none" : colorScheme.primary,
                pb: 0,

                px: 0,
                m: 0,
              }}
            >
              {showHeading && (
                <div className="bg-[var(--gray-2)] p-2 shadow-md flex flex-row align-middle justify-start items-center sm:pl-[24px] md:pl-[40px] xl:pl-[56px] text-[var(--dark-1)] lg:pl-[56px] mb-2">
                  {/* <div className="h-7 w-7">{dat.icon}</div>{" "} */}
               { data &&data.staff&& [...data.staff].reverse()[0].handledBy === getLoggedInUser.id && <div
                    className="relative text-[var(--success-darkest)] flex flex-row items-end"
                    onClick={() => {
                      dispatch(openSomeModal("show-messages-details"));
                    }}
                  >
                    {/* Number */}
                  { data2&&data &&<div className="h-6 w-6 flex align-middle items-center justify-center z-2 text-red-200 absolute top-[-2px] right-[-6px] font-normal rounded-full bg-green-800">
                    {data2.filter((value) => !value.isRead && value.senderId === data.userId).length}
                    </div>}

                    {/* Icon */}
                    <div className="relative">
                      <div className="h-10 w-10 text-[var(--success-darkest)] ">
                        <myIcons.IconWechat />
                      </div>
                    </div>
                  </div>}

                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      placeItems: "center",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                    className="px-3"
                  >
                    {capitalize({ text: dat.type.toLowerCase() })} {dat.name}
                  </Typography>
                </div>
              )}
              {dat.extraInfo && (
                <div className="  flex flex-row align-middle justify-start items-center sm:pl-[32px] md:pl-[48px] xl:pl-[64px] lg:pl-[64px] mb-5">
                  <div className="h-5 w-5 text-[var(--success-darkest)]">
                    <myIcons.IconInfoCircle />
                  </div>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      placeItems: "center",
                      fontWeight: "500",
                      fontSize: "16px",
                    }}
                    className="px-3 text-[var(--dark-1)] "
                  >
                    {dat.extraInfo}
                  </Typography>
                </div>
              )}
              {(isLoading || status.isLoading) && (
                <div>
                  <Loading transparent={true} fullscreen />
                </div>
              )}
              {isError && <div>Error: {error.message}</div>}
              {isSuccess && status.isSuccess && d && <ViewCrud data={dat} />}
              <div className="mb-5"></div>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  placeItems: "flex-start",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
                className=" sm:px-6 md:px-6 lg:px-8 xl:px-8 2xl:px-8 text-gray-500"
              >
                {capitalize({ text: "staff history" })}
              </Typography>{" "}
              {isSuccess && d?.staff && <StaffHistory staff={d.staff!} />}
              {chatId && <TransferChat chatId={chatId} />}
            </Paper>
          </Grid>

          {showHeading && <Grid item xs sm md xl lg></Grid>}
        </Grid>
      </div>
    </>
  );
}


function StaffHistory ({ staff }: { staff: StaffChatT[] }) {

  console.log('staff',staff)

 const newStaff = [...staff].reverse();
const [s, setS] = useState<StaffChatT[]>(staff)
    const [user] = useLazyGetUserQuery();


   useEffect(() => {
     let isMounted = true; // to avoid setting state on unmounted component
     const fetchData = async () => {
       const promises = newStaff.map(async (item) => {
         const handledBy =
           (item.handledBy && (await user(item.handledBy))) ?? "";
         const transferredTo =
           (item.transferredTo && (await user(item.transferredTo))) ?? "";
         const transferredBy =
           (item.transferredBy && (await user(item.transferredBy))) ?? "";

         const StaffChat = {
           handledBy: `${
             handledBy && handledBy.data && handledBy?.data?.firstName
           } ${handledBy && handledBy.data && handledBy?.data?.lastName}`,
           transferredBy: `${
             transferredBy &&
             transferredBy.data &&
             transferredBy?.data?.firstName
           }, ${
             transferredBy &&
             transferredBy.data &&
             transferredBy?.data?.lastName
           }`,
           transferredTo: `${
             transferredTo &&
             transferredTo.data &&
             transferredTo?.data?.firstName
           } ${
             transferredTo &&
             transferredTo.data &&
             transferredTo?.data?.lastName
           }`,
           date: convertDateFormat(String(item.date)),
         };
         return StaffChat;
       });

       const resolvedStaffs = await Promise.all(promises);
       if (isMounted) {
         setS(resolvedStaffs);
       }
     };

     fetchData();

     return () => {
       isMounted = false;
     };
   }, [staff, user]);
const transferCategory: CRUCategoriesI[] = [
  {
    key: "details",
    name: "",
  },
];

const transferHeading: CRUHeadingI[] = [
  {
    key: "transferredTo",
    name: "transferred to",
    formType: "text",
    isToggle: false,
    placeholder: "select staff",
    
    prefixIcons: <myIcons.UserBold />,
    category: "details", // Credit amount also relates to the financial aspect
  },
  {
    key: "transferredBy",
    name: "transferred by",
    formType: "text",
    isToggle: false,
    placeholder: "select staff",
    
    prefixIcons: <myIcons.UserBold/>,
    category: "details", // Credit amount also relates to the financial aspect
  },
  {
    key: "handledBy",
    name: "handled by",
    formType: "text",
    isToggle: false,
    placeholder: "select staff",
    
    prefixIcons: <myIcons.UserBold/>,
    category: "details", // Credit amount also relates to the financial aspect
  },
  {
    key: "date",
    name: "date",
    formType: "text",
    isToggle: false,
    placeholder: "select staff",
    
    prefixIcons: <myIcons.UserBold />,
    category: "details", // Credit amount also relates to the financial aspect
  },
];

 const dat: CruI = {
  type: "VIEW",
  headings: transferHeading,
  categories: transferCategory,
  data: {},
  name: "chat",
  icon: <myIcons.IconCommentSms />,
  id: "",

  showButton: {
    deleteButton: true,
  },
};


const xx:CruI[]= s.map((item, index)=>({ ...dat, data: item, id: index.toString() }))
  return (
    <>
      
    {xx.map((item, index)=>(
<ViewCrud key={index} data={item}/>
    ))}
    </>
  )


}


function ChatPopUp({chat}:{chat:ChatI}){


  // const [messages, setMessages]= useState<MessagesI[]>([])
  const { data, isLoading } = useGetMessagesByChatIdQuery(chat._id, { pollingInterval: 5000 })
  const [sendMessage, { isLoading: loading }] = useCreateMessageMutation()
  // const socket = new SocketClient()
  const [value, setValue] = useState<string>('')

useEffect(()=>{


  


  

}, [])

  async function send () {

    if (value) {
      await sendMessage({
        chatId: chat._id,
        message: value
      })
    }
  }
  return (
    <div className="">
      <div className="">
        <div className={mergeCssClass("bg-white shadow-md rounded-lg ", isMobile()?"":" w-full")}>
          <div className="p-4 border-b bg-primary text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">chat page</p>
          </div>
          {isLoading ? (
            <Loading size={40} transparent />
          ) : (
            data && <RenderChat messages={data} chat={chat} />
          )}
          <div className=" border-t  ">
            <div className="px-3">
              {" "}
              <Input
                props={{
                  inputType: {
                    type: "text",
                    value: value,
                    onChange: (e) => {
                      setValue(e.currentTarget.value);
                    
                    },
                  },

                  label: "",
                  suffix: {
                    element: (
                      <div className="h-10 w-10">
                     {loading? <Loading size={20} transparent />:   <myIcons.IconSendCircle />}
                      </div>
                    ),
                    click() {
                      send();
                      setValue('')
                    },
                  },
                  prefix: {
                    element: <div className="h-10 w-5 text-green-700"></div>,
                  },
                }}
              />
            </div>
            {/* <input id="user-input" type="text" placeholder="Type a message" className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" /> */}
            {/* <div className='h-10 w-10'><myIcons.IconSendCircle /></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}



function RenderChat({messages, chat}:{messages:MessagesI[], chat:ChatI}) {
const newMessage = [...messages]


  return (
    <div id="chatbox" className="p-4 h-[500px] overflow-y-auto">
      {newMessage.slice().reverse().map((value) => {
  
        return (
          <>
            {value.senderId !== chat.userId && (
              <div className="mb-2 text-right">
                <p className="bg-green-800 text-white rounded-lg py-2 px-4 inline-block">
                  <div className="font-medium text-[12px]">{value.message}</div>
                  <span className="flex flex-row text-[10px] align-middle items-end justify-end font-normal">
                    {convertDateFormat(String(value.createdAt))}{" "}
                    <div
                      className={mergeCssClass(
                        "h-6 w-6 px-[2px] flex flex-col justify-center items-baseline align-baseline ",
                        value.isRead ? "text-primary" : "text-white"
                      )}
                    >
                      <myIcons.IconCheck2All />
                    </div>
                  </span>
                </p>
              </div>
            )}
            {value.senderId === chat.userId && (
              <div className="mb-2">
                <p className="bg-gray-700  rounded-lg py-2 px-4 inline-block">
                  <div className="font-medium text-white text-[12px]">
                    {value.message}
                  </div>
                  <span className="flex flex-row  text-white text-[10px] align-middle items-end justify-end font-normal">
                    {convertDateFormat(String(value.createdAt))}{" "}
                  </span>
                </p>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}