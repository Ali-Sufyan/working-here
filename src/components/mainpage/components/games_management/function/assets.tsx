 
import { BASE_URL, tableColor } from "@/app/config";
import { IGameAsset } from "@/app/services/games/new-query";
import { Button } from "@/components/ui/button";
import { axiosSetup } from "@/components/utilities/axios-setup";
import { ColumnElementT, ColumnT, HeadingT, TableDataT } from "andrea-table";
import {
  Download,
  Edit,
  Image as ImageIcon,
  Maximize2,
  TrashIcon,
  Video,
  X,
} from "lucide-react";
import React, { useState } from "react";



const AssetTypeIcons = {
  screenshot: <ImageIcon className="w-6 h-6 text-blue-500" />,
  video: <Video className="w-6 h-6 text-red-500" />,
  banner: <ImageIcon className="w-6 h-6 text-green-500" />,
  logo: <ImageIcon className="w-6 h-6 text-purple-500" />,
  cover: <ImageIcon className="w-6 h-6 text-orange-500" />,
};


const GameAssetsGallery: React.FC<ColumnElementT<IGameAsset>> = ({
  columnData: asset,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const downloadAsset = () => {
    const link = document.createElement("a");
    link.href = asset.url;
    link.download = asset.title || `game-asset-${asset.type}`;
    link.click();
  };

  return (
    <div className="bg-white my-2 rounded-lg shadow-md overflow-hidden max-w-[100px] items-center mx-auto">
      {/* Asset Thumbnail */}
      <div className="relative group">
        <img
          src={asset.thumbnail || asset.url}
          alt={asset.title || "Game Asset"}
          className="w-full h-24 object-cover"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center space-x-4">
          <button
            onClick={openModal}
            className="bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            title="View Details"
          >
            <Maximize2 className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={downloadAsset}
            className="bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Download"
          >
            <Download className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Type Icon */}
        <div className="absolute top-2 right-2">
          {AssetTypeIcons[asset.type as keyof typeof AssetTypeIcons]}
        </div>
      </div>

      {/* Asset Info */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-800">
            {asset.title ||
              `${
                asset.type.charAt(0).toUpperCase() + asset.type.slice(1)
              } Asset`}
          </h3>
        </div>
        {asset.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {asset.description}
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            {/* Modal Content */}
            <div className="grid md:grid-cols-2">
              {/* Asset Display */}
              <div className="bg-gray-100 flex items-center justify-center">
                {asset.type === "video" ? (
                  <video controls className="max-w-full max-h-[80vh]">
                    <source src={asset.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={asset.url}
                    alt={asset.title || "Asset"}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                )}
              </div>

              {/* Asset Details */}
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {AssetTypeIcons[asset.type as keyof typeof AssetTypeIcons]}
                  <h2 className="text-2xl font-bold text-gray-800">
                    {asset.title ||
                      `${
                        asset.type.charAt(0).toUpperCase() + asset.type.slice(1)
                      } Asset`}
                  </h2>
                </div>

                {asset.description && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-600">{asset.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Type:</span>
                    <span className="ml-2 capitalize">{asset.type}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Added:</span>
                    <span className="ml-2">
                      {new Date(asset.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={downloadAsset}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AssetActions: React.FC<ColumnElementT<IGameAsset>> = ({ columnData }) => {
  console.log(columnData);
  
  return (
    <div className="flex items-center space-x-2">
      <Button
      
        className=" "
        variant="ghost"
        title="Edit"
      >
       <Edit  className="h-4 w-4"/>
        Edit
      </Button>
      <Button
        className=" text-red-500 hover:text-white  hover:bg-red-700 transition"
        title="Delete"
        variant="ghost"
      >
        <TrashIcon className="h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}
const assetHeading: HeadingT<IGameAsset>[] = [
  { canFilter: false, key: "_assets", name: "Assets", },
  { canFilter: false, key: "action", name: "", },
]
const assetColumns: ColumnT<IGameAsset>[] = [
  { '_assets': <GameAssetsGallery columnData={{}} /> },
  { 'action': <AssetActions columnData={{}} /> },  
]

async function fetchGameAssets ({ url, baseUrl }: { url: string, baseUrl: string }) { 

    try {
        const ax = await axiosSetup({
            authRoute: true,
            baseURL: baseUrl
        }).get(url)
        const data = ax.data
        return data.data;
    }
    catch (error) {
        console.log(error);
    }
}
export function gamesAssetTableData (gameId: string): TableDataT<IGameAsset>{
    const gamesAssetTableData: TableDataT<IGameAsset> = {
      tableName: "",
      baseUrl: BASE_URL,
      subUrl: `/games/game-assets/developer/get/assets/${gameId}/all`,
      column: assetColumns,
      heading: assetHeading,
      query: {},
      fn: {
        fetchFn: fetchGameAssets,
        customFn: undefined,
      }, buttonName: {
        customButton: "Add Asset",

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
        customButton:true,
        seeMore: false,
        tableName: false,
      },
        crud: {
          custom:true
        },
      style:tableColor
    };
    return gamesAssetTableData;
}