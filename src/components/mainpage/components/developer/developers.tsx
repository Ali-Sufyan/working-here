import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { colorScheme } from "../../../utilities/color-scheme";

function Developers() {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Container
          maxWidth={false}
          sx={{ mb: 4, background: colorScheme.gray_2, pt: 10 }}
        >
          {/* <Typography sx={{ m: 1, color: colorScheme.dark_2 }} variant="h5">
            {" "}
            Developers
          </Typography> */}
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
export default Developers;
