/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL, tableColor } from "@/app/config";
import { IGame } from "@/app/services/games/types";
import { setGameData } from "@/app/slices/games/games.slice";
import { useAppDispatch } from "@/app/slices/hooks";
import { Button } from "@/components/ui/button";
import { axiosSetup } from "@/components/utilities/axios-setup";
import { ColumnElementT, ColumnT, HeadingT, TableDataT } from "andrea-table";
import {
  ChartLine,
  Clock,
  Ellipsis,
  EllipsisVertical,
  Save,
  Settings,
  StopCircle,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const gameHeadings: HeadingT<IGame>[] = [
  {
    key: "title",
    name: "Title",
    canFilter: true,
    canSort: true,
    isHeader: true,
    canCopy: true,
  },

  {
    key: "_status",
    name: "status",
    canFilter: true,
    canSort: true,
  },

  {
    key: "ageRating",
    name: "age",
    canFilter: true,
    canSort: true,
  },

  {
    key: "_action",
    name: "",
    canFilter: false,
  },
];

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
              <div className="flex w-full gap-1 justify-center font-semibold flex-row place-items-center text-green-700 px-2 py-1 rounded-full ">
                <Save className="h-6 w-6" />
                <span>Draft</span> 
              </div>
            </div>
          </>
        );
      }
      case "in_review": {
        return (
          <>
            <div className="flex justify-center   w-full flex-row place-items-center">
              <div className="gap-1 w-full justify-center font-semibold flex-row place-items-center text-yellow-600 flex   px-2 py-1 rounded-full">
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
            <div className="flex justify-center   w-full flex-row place-items-center">
              <div className="gap-1 w-full justify-center font-semibold flex-row place-items-center bg-green-500 flex   px-2 py-1 rounded-full">
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
            <div className="flex justify-center   w-full flex-row place-items-center">
              <div className="gap-1 w-full justify-center font-semibold flex-row place-items-center bg-red-500 flex   px-2 py-1 rounded-full">
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
            <div className="flex justify-center   w-full flex-row place-items-center">
              <div className="gap-1 w-full justify-center font-semibold flex-row place-items-center bg-red-500 flex   px-2 py-1 rounded-full">
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
function Action({ columnData }: { columnData: any }) {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Reference to the popup container
  const popupRef = useRef<HTMLDivElement | null>(null);

  // Handle click outside to close the popup
  useEffect(() => {
    // Function to close the popup if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowMore(false);  // Close the popup
      }
    };

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row justify-center my-10">
      <div className="relative translate-x-1 transition-all">
        {showMore ? (
          <EllipsisVertical
            className="w-6 text-primary cursor-pointer"
            onClick={() => setShowMore(false)}
          />
        ) : (
          <Ellipsis
            className="w-6 hover:bg-gray-100 cursor-pointer"
            onClick={() => setShowMore(true)}
          />
        )}

        <div
          ref={popupRef}
          className={`right-7 bottom-[0] absolute z-[99] ${
            showMore ? "" : "hidden"
          } bg-white custom-elevated-paper px-2`}
        >
          <div className="flex flex-col bg-white p-1 space-y-2">
            <Button
              variant="ghost"
              className="hover:bg-gray-100 text-black rounded-md px-2 bg-white"
            >
              <ChartLine className="mr-2" /> Metrics
            </Button>
            <Button
              onClick={() => {
                dispatch(setGameData(columnData));
                navigate(`/games/${columnData.id}/settings`);
              }}
              variant="ghost"
              className=" text-black rounded-md px-2 bg-white"
            >
              <Settings className="mr-2" /> Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const gameExtraColumn: ColumnT<IGame>[] = [
  { _action: <Action columnData={""} /> },
  { _status: <Status columnData={{}} /> },
];

async function fetchFn({
  url,
}: {
  url: string;
  baseUrl: string;
}): Promise<any> {
  try {
    const ax = await axiosSetup({}).get(url);
    // return fetch(`${baseUrl}${url}`).then((res) => res.json());

    const dta = ax.data;

    return dta.data;
  } catch (error) {
    console.log(error);
  }
}
export const devGamesTableData: TableDataT<IGame> = {
  tableName: "",
  baseUrl: BASE_URL,
  subUrl: "/games/game/",
  heading: gameHeadings,
  column: gameExtraColumn,
  buttonName: {
    customButton: "Add Game",
  },
  query: {},
  fn: {
    fetchFn,
  },
  show: {
    filters: false,
    sort: true,
    exports:true,
    addButton: false,
     checkBox: false,pagination:true, select:true
  },
  // refresh:{},
  crud: {},
  style: tableColor,
};
