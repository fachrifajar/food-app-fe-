import React from "react";
import Boxs from "./components/atoms/box-template";
import axios from "axios";
import Navbar from "./components/organisms/navbar";

function App() {
  document.title = "Home";

  const [mode, setMode] = React.useState("light");

  return (
    <>
      <Navbar _setTheme={mode} getTheme={(e) => setMode(e)} />
      <Boxs _setTheme={mode} _sx={{ height: "200vh" }}>
        asdsa
      </Boxs>
    </>
  );
}

export default App;
