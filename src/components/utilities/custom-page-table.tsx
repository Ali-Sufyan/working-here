/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Box, Button } from "@mui/material";
import { NewTable, TableDataT } from "andrea-table";
import { HiPlusCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { PageMajorLayout, PageMiniLayout } from "../mainpage/shared/layout/pages-layout";


interface Props {
  tableName: string;
  tableDescription: string;

  button?: {
    buttonLabel: string;
    buttonIcon?: JSX.Element;
    buttonOnClick: string;
  };
    pageMiniLayout?: JSX.Element;
    tableData:TableDataT<any>;
}

export const CustomTablePage: React.FC<Props> = ( 
    { tableName, tableDescription, button, pageMiniLayout, tableData }: Props
)=> {
  const navigate = useNavigate();

  return (
    <>
      {" "}
      <div className="min-h-screen bg-gray-50">
        <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
               {tableName}
              </h1>
           {button &&<Button
                onClick={() => navigate(button.buttonOnClick)}
                className="w-full md:w-auto flex items-center justify-center gap-3 text-white px-4 py-2 bg-primary text-sm md:text-base"
              >
              {button?.buttonIcon ? button.buttonIcon : <HiPlusCircle size={25} />}
                {button?.buttonLabel}
              </Button>}
            </div>

            <Card>
              <CardHeader>
                <CardDescription className="text-sm text-gray-500">
                  {tableDescription} 
                              </CardDescription>
                             
              </CardHeader>
              <CardContent className="!text-lg ">
               { pageMiniLayout && <PageMiniLayout children={pageMiniLayout} />}

                <PageMajorLayout children={<NewTable data={tableData} />} />
              </CardContent>
            </Card>
          </div>
        </Box>
      </div>
    </>
  );
}
