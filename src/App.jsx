import React from "react";
import Boxs from "./components/molecules/box-template.jsx";
import { light } from "@mui/material/styles/createPalette.js";

function App() {
  document.title = "Home";
  const [mode, setMode] = React.useState("light");

  return (
    <>
      <Boxs _setTheme={mode}>asdsa</Boxs>
    </>
  );
}

export default App;
