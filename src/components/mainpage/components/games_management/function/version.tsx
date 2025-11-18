/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL, tableColor } from "@/app/config";
import { GameStatus, IGame, IGameVersion } from "@/app/services/games/new-query";
import { useUpdateGameVersionMutation } from "@/app/services/games/query";
import { useAppDispatch } from "@/app/slices/hooks";
import { closeSomeModal, openSomeModal } from "@/app/slices/modal/modal.types";
import { Button } from "@/components/ui/button";
import { ComboboxPopover } from "@/components/ui/combo-box";
import { axiosSetup } from "@/components/utilities/axios-setup";
import AllCustomModal from "@/components/utilities/modal/allModal";
import { successToast } from "@/components/utilities/toaster";
import { formatBytes } from "@/components/utilities/utils";
import { ColumnElementT, ColumnT, HeadingT, TableDataT } from "andrea-table";
import { Clock, Edit, Lock, LockOpen, Save, StopCircle, TrashIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import GameVersionEditCard from "../components/update-game-version";


async function fetchFn ({ baseUrl, url }: { url: string; baseUrl: string; }): Promise<any> {
           try {
             const getter = axiosSetup({ authRoute: true, baseURL: baseUrl });
             const response = await getter.get(url);
             return response.data.data;
           } catch (error) {
             console.log(error);
           }
            }


const Status: React.FC<ColumnElementT<IGame>> = ({ columnData }) => {
  //      DRAFT = 'draft',
  //   IN_REVIEW = 'in_review',
  //   PUBLISHED = 'published',
  //   SUSPENDED = 'suspended',
  //   ARCHIVED = 'archived',

  function getStatus(status: string) {
    switch (status) {
      case "draft": {
        return (
          <>
            <div className="flex justify-center   w-full flex-row place-items-center">
              <div className="flex w-full justify-center font-semibold flex-row place-items-center text-green-700 px-2 py-1 rounded-full ">
                <Save className="h-4 w-4" />
                Draft
              </div>
            </div>
          </>
        );
      }
      case "in_review": {
        return (
          <>
            <div>
              <div className="text-yellow-600 flex   px-2 py-1 rounded-full">
                <Clock className="h-6 w-6" />
                In Review
              </div>
            </div>
          </>
        );
      }
      case "published": {
        return (
          <>
            <div>
              <div className="bg-green-500 text-white px-2 py-1 rounded-full">
                <Save className="h-6 w-6" />
                Published
              </div>
            </div>
          </>
        );
      }
      case "suspended": {
        return (
          <>
            <div>
              <div className="bg-red-500 text-white px-2 py-1 rounded-full">
                <StopCircle className="h-6 w-6" />
                Suspended
              </div>
            </div>
          </>
        );
      }
      case "archived": {
        return (
          <>
            <div>
              <div className="bg-red-500 text-white px-2 py-1 rounded-full">
                <StopCircle className="h-6 w-6" />
                Archived
              </div>
            </div>
          </>
        );
      }
      default:
        return <>{status}</>;
    }
  }

  return (
    <div className="flex flex-row place-items-center justify-center align-middle w-full">
      {getStatus(columnData.status)}
    </div>
  );
};
const VersionAction: React.FC<ColumnElementT<IGameVersion>> = ({ columnData }) => {
    const dispatch = useAppDispatch();
 
 const [caller, {isLoading, isSuccess, isError, }]= useUpdateGameVersionMutation()
    const { id: gameId } = useParams();
    

    useEffect(() => { 
        if(isSuccess){
            successToast("Version updated successfully")
            dispatch(closeSomeModal('open-game-version'))
        }
      
    },[ isSuccess])

    const deletes =async () => {
        console.log("delete")
}
    const updater =async  (dt: IGameVersion&{isDraft:boolean}) => {

       

    await caller({gameId: gameId as string, versionId: dt._id, version: dt.version, isPublic: dt.isPublic, size: dt.size, status: dt.status, url: dt.downloadUrl, isDraft: dt.isDraft})
      
        if (isError===true) {
          return false
        }

        if (isSuccess===true) {
          return false
        }
        return isLoading 
    }


    const canEdit = columnData.status === GameStatus.DRAFT || columnData.status === GameStatus.IN_REVIEW;
    return (
      <>
        <AllCustomModal
          modalId="open-game-version"
          children={<GameVersionEditCard onDelete={deletes} onUpdate={updater} canEdit={canEdit} version={columnData as IGameVersion} />}
        />

        <div className="flex items-center ">
                <Button className=" " variant="ghost" title="Edit"
          
                    onClick={() => {
                        dispatch(openSomeModal('open-game-version'))
                     }}
                >
            {columnData.status === GameStatus.DRAFT ||
            columnData.status === GameStatus.IN_REVIEW ? (
              <>
                <Edit className="h-4 w-4" />
                Edit
              </>
            ) : (
              <>
                <Clock className="h-4 w-4" />
                Review
              </>
            )}
          </Button>
          {(columnData.status === GameStatus.DRAFT ||
            columnData.status === GameStatus.IN_REVIEW ||
            columnData.status === GameStatus.SUSPENDED) && (
            <Button
              className=" text-red-500 hover:text-white  hover:bg-red-700 transition"
              title="Delete"
              variant="ghost"
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </>
    );
}
const VersionPublic: React.FC<ColumnElementT<IGameVersion>> = ({ columnData }) => {
   const [value,setValue] = React.useState(columnData.isPublic ? "public" : "private")
   
    return ( 
   
            <div className="flex place-items-center mx-3 my-2 justify-center ">  
            

            { columnData.isPublic?
                   <Button variant="outline" className="w-[150px] justify-center align-middle">
            {value === 'public' ? <LockOpen className="h-4 w-4 text-primary" /> : <Lock className="h-4 w-4 text-secondary-1" />}
            {value === 'public' ? 'Public' : 'Private'}
          </Button>:
                <ComboboxPopover
                disabled={true}
                Icon={value ==='public' ? <LockOpen className="h-4 w-4 text-primary" /> : <Lock className="h-4 w-4 text-secondary-1" />}
                onSelect={(value) => {
                  setValue(value);
                }}
                    statuses={[{ value: "public", label: "Public" }, { value: "private", label: "Private" }]}
                    value={value}
                />}
            </div>
   
    );
}
const ParseSize: React.FC<ColumnElementT<IGameVersion>> = ({ columnData }) => {
    return (
        <div>
            {formatBytes(columnData.size)}  
        </div>

    )
}


        const versionHeading: HeadingT<IGameVersion>[] = [
            { canFilter: false, key: "version", name: "Version", },
         
            {
                name: "size",
                key: "_size",
                canFilter: false
            },
            {
                name: "is public",
                key: "_isPublic",
                canFilter: false
            }, {
                name: "status",
                key: "_status",
                canFilter: false
            },

            { canFilter: false, key: "action", name: "", },
        ]
const versionColumns: ColumnT<IGameVersion>[] = [
    { 'action': <VersionAction columnData={{}} /> },
    { '_isPublic': <VersionPublic columnData={{}} /> },
    { '_size': <ParseSize columnData={{}} /> },
    {_status: <Status columnData={{}}/>}
    
]

export function versionTableData (gameId: string): TableDataT<IGameVersion> {
    const versionTableData: TableDataT<IGameVersion> = {
        tableName: "",
        baseUrl: BASE_URL,
        subUrl: `/games/game-version/developer/get/all/${gameId}`,
        heading: versionHeading,
        column: versionColumns,
        query: {
           
        },
        fn: {
            fetchFn,
           
        },
        buttonName: {
            customButton: "new version",
        },
        show: {
            filters: false,
            pagination: true,
            search: false,
            select: false,
            sort: false,
            table: true,
            exports: false,
            columnVisibility: false,
            deleteButton: false,
            addButton: false,
            checkBox: false,
            customButton: true,
            seeMore: false,
            tableName: false
        },
        crud: {
            add: false,
            edit: false,
            custom: true,
            delete: false,
            view: false,
            export: false
        }, style: tableColor 
    };
    return versionTableData;
}

