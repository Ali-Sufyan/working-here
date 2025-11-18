import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { NewTable } from "andrea-table";
import { useNavigate } from "react-router-dom";
import { devGamesTableData } from "./function";
import { Box, Button } from "@mui/material";
import { HiPlusCircle } from "react-icons/hi";
export function Games() {
  const navigate = useNavigate();
  devGamesTableData.fn.customFn = () => navigate("/games/add");

  return (
    <div className="min-h-screen bg-gray-50">
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <div className="px-4  sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Games Management
            </h1>
            <Button
              onClick={() => navigate("/games/add")}
              className="flex items-center justify-center w-full gap-3 px-4 py-2 text-sm text-white md:w-auto bg-primary md:text-base"
            >
              <HiPlusCircle size={25} />
              Add New Game
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardDescription>
                Manage and monitor all your games in one place
              </CardDescription>
            </CardHeader>
            <CardContent className="!text-lg">
              <NewTable data={devGamesTableData} />
            </CardContent>
          </Card>
        </div>
      </Box>
    </div>
  );
}
