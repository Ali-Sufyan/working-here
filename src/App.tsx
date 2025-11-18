import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Router } from "./routes/Routes";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <RouterProvider router={Router()} />
          </ThemeProvider>
        </StyledEngineProvider>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
