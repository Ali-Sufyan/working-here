/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Paper, Typography } from "@mui/material";

import { colorScheme } from "../../../color-scheme";
import { Input } from "../../../forms/input";
import { InputI } from "../../../forms/input.interface";
import { myIcons } from "../../../icons";
import { capitalize } from "../../../utils";
import { CruI } from "../interface.gen";

export function CrudUI({ data, Children }: { data: CruI, Children: JSX.Element }) {
  const showHeading = data.showHeading ?? true;


  return (
    <div className={showHeading ? "mt-10" : ""}>
      <Grid container>
        {showHeading && <Grid item xs md sm xl lg></Grid>}

        <Grid item xs={12} sm={12} lg={12} md={12} xl={12}>
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
                <div className="h-7 w-7">{data.icon}</div>
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
                  {capitalize({ text: data.type.toLowerCase() })} {data.name}
                </Typography>
              </div>
            )}
            {data.extraInfo && (
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
                  {data.extraInfo}
                </Typography>
              </div>
            )}

            <div className="p-4 "></div>
{Children}
            <div className="mb-10"></div>
          </Paper>
        </Grid>

        {showHeading && <Grid item xs sm md xl lg></Grid>}
      </Grid>
    </div>
  );
}
export function MapFormUI ({ data }: { data: InputI[] }) {
    
    return (
      <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        xs={12}
        sm={12}
        lg={12}
        md={12}
        xl={12}
      >
        {data.map((input, index) => (
          <Grid
      
            xs={12}
            sm={12}
            lg={6}
            md={12}
            xl={6}
            className="lg:px-6 sm:px-2 xl:px-6 md:px-2 my-2"
            key={index}
          >
  <Input props={input}
  
                />
          </Grid>
        ))}
      </Grid>
    );
}
