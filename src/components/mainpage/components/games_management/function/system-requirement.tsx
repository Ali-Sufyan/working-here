/* eslint-disable @typescript-eslint/no-unused-vars */
import { BASE_URL, tableColor } from "@/app/config";
import { ISystemRequirements } from "@/app/services/games/new-query";
import { axiosSetup } from "@/components/utilities/axios-setup";
import { parseDateTime } from "@/components/utilities/time-magic";
import { ColumnElementT, ColumnT, HeadingT, TableDataT } from "andrea-table";
import { ChevronDown, ChevronUp, Cpu, Edit, HardDrive, MemoryStick, Monitor, Trash2 } from "lucide-react";
import { useState } from "react";





const SystemRequirementIcon = {
  os: <Monitor className="w-5 h-5 text-blue-600" />,
  processor: <Cpu className="w-5 h-5 text-green-600" />,
  memory: <MemoryStick className="w-5 h-5 text-purple-600" />,
  storage: <HardDrive className="w-5 h-5 text-orange-600" />,
  graphics: <Monitor className="w-5 h-5 text-red-600" />,
};



const SystemRequirementsCard: React.FC<ColumnElementT<ISystemRequirements>> = ({
  columnData: systemRequirements,
  
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatKey = (key: string) => {
    return (
      key.charAt(0).toUpperCase() +
      key
        .slice(1)
        .replace(/([A-Z])/g, " $1")
        .trim()
    );
  };

  const renderRequirements = (requirementType: "minimum" | "recommended") => {
    const requirements = systemRequirements[requirementType];
    return Object.entries(requirements)
      .filter(([_, value]) => value && String(value).trim() !== "")
      .map(([key, value]) => {
        const Icon = SystemRequirementIcon[
          key as keyof typeof SystemRequirementIcon
        ] || <Monitor className="w-5 h-5 text-gray-600" />;

        return (
          <div
            key={key}
            className="flex items-center border  justify-center py-2 border-b last:border-b-0 border-gray-100"
          >
           <div className="flex justify-start w-1/2 ">
                <div className="">{Icon}</div>
                <div className="px-3">
                  <span className="text-sm font-medium text-gray-600">
                    {formatKey(key)}
                  </span>
                </div>
           </div>
            <div>
              <span className="text-sm text-gray-800 font-semibold">
                {value as string}
              </span>
            </div>
          </div>
        );
      });
  };

  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold text-gray-800">
            {systemRequirements.platform} System Requirements
          </span>
          <span className="text-sm text-gray-500">
            Updated {" "}
            {parseDateTime(systemRequirements.updatedAt).time} {" "}
            {parseDateTime(systemRequirements.updatedAt).date}
          </span>
        </div>

        <div className="flex items-center space-x-2">
       
            <button
              onClick={() => {}}
              className="text-blue-600 hover:bg-blue-200 p-2 bg-blue-50 rounded-full transition"
              title="Edit System Requirements"
            >
              <Edit className="w-5 h-5" />
            </button>
          
       
            <button
              onClick={() => {}}
              className="text-red-600 hover:bg-red-200 bg-red-50 p-2 rounded-full transition"
              title="Delete System Requirements"
            >
              <Trash2 className="w-5 h-5" />
            </button>
        
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-600 hover:bg-gray-200 bg-gray-50 p-2 rounded-full transition"
            title={isExpanded ? "Collapse Details" : "Expand Details"}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4">
          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-700 mb-2">
              Minimum Requirements
            </h4>
            {renderRequirements("minimum")}
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">
              Recommended Requirements
            </h4>
            {renderRequirements("recommended")}
          </div>
        </div>
      )}
    </div>
  );
};


const heading: HeadingT<ISystemRequirements>[] = [
  {
    name: ``,
    key: "_systemRequirements",
    canFilter: false,
  },
 
];
const xtraColumn: ColumnT<ISystemRequirements>[] = [
   
    {
        _systemRequirements: <SystemRequirementsCard columnData={{}} />
    }
]
async function fetchSystemRequirements ({ baseUrl,url}:{baseUrl: string, url: string}){
    try {
        const getter = axiosSetup({ authRoute: true, baseURL: baseUrl });
        const response = await getter.get(url);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
    
    
}

export function systemRequirementTableData (gameId: string): TableDataT<ISystemRequirements> { 
const systemRequirementTableData: TableDataT<ISystemRequirements> = {
  tableName: "",
  baseUrl: BASE_URL,
  subUrl: `/games/system-requirements/developer/${gameId}/all`,
  column: xtraColumn,
  heading: heading,
  query: {},
  fn: {
    fetchFn: fetchSystemRequirements,

    customFn: undefined,
  },
  show: {
    filters: false,
    pagination: false,
    search: false,
    select: false,
    sort: false,
    table: true,
    exports: false,
    addButton: false,
    checkBox: false,
    customButton: false,
    seeMore: false,
    tableName: false,
  },
  style: tableColor,
  crud: {},
};
    return systemRequirementTableData;
}
