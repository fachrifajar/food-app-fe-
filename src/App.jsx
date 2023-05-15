import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import CssBaseline from "@mui/material/CssBaseline";
import Boxs from "./components/molecules/box-template.jsx";

function App() {
  const setTheme = theme("light");

  return (
    <>
      <Boxs>
        <ThemeProvider theme={setTheme}>
          <CssBaseline />
          asdsa
        </ThemeProvider>
      </Boxs>
    </>
  );
}

export default App;
