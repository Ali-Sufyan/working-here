import { useLazyGetGameByDevIdQuery } from "@/app/services/games/query";
import { useAppDispatch, useAppSelector } from "@/app/slices/hooks";
import { closeSomeModal, openSomeModal } from "@/app/slices/modal/modal.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllCustomModal from "@/components/utilities/modal/allModal";
import { NewTable } from "andrea-table";
import {
  AlertTriangle,
  Calendar,
  Edit,
  GamepadIcon,
  Share2
} from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { gamesAssetTableData } from "../function/assets";
import { systemRequirementTableData } from "../function/system-requirement";
import { versionTableData } from "../function/version";
import CreateGameVersion from "./create-version";
import GameUpdateModal from "./update-game";

const GameDetailPage = () => {

  const {id:gameId} = useParams();
  const dispatch = useAppDispatch();
  
  const sysReqTable = systemRequirementTableData(gameId??'');
  const assetTable = gamesAssetTableData(gameId ?? '');
  const versionTable = versionTableData(gameId ?? '');
  versionTable.fn.customFn = () => {

    dispatch(closeSomeModal("open-game-edit"))
    dispatch(openSomeModal("open-create-version"))
  }
    const game = useAppSelector((state) => state.gameUpload.incomingGame);


    const [gameData, setGameData] = React.useState(game);
const [getGame, {data} ]= useLazyGetGameByDevIdQuery();

  // Mock data for system requirements, assets, and versions
  useEffect(() => { 
    async function fetchData () { 
      await getGame( gameId )
      if(data){
        setGameData(data)
      }
    
    }
    fetchData()

  },[gameId, data, getGame])

 

  


  return (
    <>
      <AllCustomModal modalId="open-create-version"   children={<CreateGameVersion />} />
      <AllCustomModal modalId="open-game-edit" width="700px"  children={<GameUpdateModal  onClose={()=>{
        dispatch(closeSomeModal("open-game-edit"))
      }} gameData={gameData} />} />
      

      <div className="bg-gray-50  mx-auto text-gray-900 px-4 py-8 space-y-6">
        {/* Header Section - Stack on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mt-5">
          <div className="w-full sm:w-auto flex-grow">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">
                {gameData.title}
              </h1>
              {gameData.status === "draft" && (
                <Badge variant="destructive" className="ml-2">
                  Draft
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">{gameData.status}</Badge>
              <Badge>{gameData.ageRating}</Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {/* Action Buttons */}
            <Button variant="outline" onClick={() =>{
              dispatch(openSomeModal("open-game-edit"))
            }}>
              <Edit className="mr-2 h-4 w-4" /> Edit Game
            </Button>
            <Button>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
  
        {/* Social Links with Icons */}
        <div className="flex flex-wrap gap-4 justify-start">
          {Object.entries(gameData.socialLinks).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm md:text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* You could add platform-specific icons here */}
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>
          ))}
        </div>
  
        {/* Main Content - Stack on mobile, grid on tablet/desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base lg:text-lg mb-4">
                  {gameData.description}
                </p>
  
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Release Date
                    </h3>
                    <p>{new Date(gameData.releaseDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <GamepadIcon className="w-4 h-4" /> Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {gameData.features.map((feature) => (
                        <Badge key={feature} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
  
            {/* Responsive Tabs */}
            <Tabs defaultValue="requirements" className="w-full">
              <TabsList className="w-full flex justify-start overflow-x-auto text-white gap-2">
                <TabsTrigger value="requirements" className="flex-1">
                  System Requirements
                </TabsTrigger>
                <TabsTrigger value="assets" className="flex-1">
                  Assets
                </TabsTrigger>
                <TabsTrigger value="versions" className="flex-1">
                  Versions
                </TabsTrigger>
              </TabsList>
  
              <TabsContent value="requirements">
                <Card>
                  <CardContent className="pt-6">
                 
                    {gameId && <NewTable data={ sysReqTable} />}
                  </CardContent>
                </Card>
              </TabsContent>
  
              <TabsContent value="assets">
                <Card>
                  <CardContent className="pt-6">
                    
                     
                      {gameId && <NewTable data={assetTable} />}
                  </CardContent>
                </Card>
              </TabsContent>
  
              <TabsContent value="versions">
                <Card>
                  <CardContent className="pt-6 ">
                  


                    {gameId && <NewTable data={versionTable} />}
                    
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
  
          {/* Sidebar - Full width on mobile, 1/3 on desktop */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tags & Genres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {gameData.genres.map((genre) => (
                        <Badge key={genre} variant="outline">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {gameData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
  
            {gameData.contentWarnings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <AlertTriangle className="w-5 h-5" />
                    Content Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {gameData.contentWarnings.map((warning) => (
                      <Badge key={warning} variant="destructive">
                        {warning}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
   </>
  );
};

export default GameDetailPage;
