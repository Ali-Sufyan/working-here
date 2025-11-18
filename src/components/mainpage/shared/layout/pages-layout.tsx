import { Grid } from "@mui/material";

import { useAppSelectorEqual } from "../../../../app/slices/hooks";
import "../shared.css";

export function PageMiniLayout({ children }: { children: JSX.Element }) {
  const miniLayout = useAppSelectorEqual(
    (state) => state.miniLayout.showMiniLayout
  );
  return (
    <>
      {miniLayout && (
        <Grid item xs={12} md={12} sx={{ my: 3 }} className="my-[20px] ">
       
            {children}
  
        </Grid>
      )}
    </>
  );
}

export function PageMajorLayout({ children }: { children: JSX.Element }) {
  return (
    <Grid item xs={12} className="page-major-layout">
    
       
        {children}
  
    </Grid>
  );
}
