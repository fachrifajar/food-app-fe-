import { createTheme } from "@mui/material";

const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === "light" ? "#EFC81A" : "#42a5f5",
      },
      secondary: {
        main: mode === "light" ? "#EFC81ACC" : "#90caf9",
      },
      text: {
        primary: mode === "light" ? "#2e266f" : "#fff",
        secondary: mode === "light" ? "#3f3a3a" : "#e3f2fd",
        contrastText: mode === "light" ? "#696f79" : "#696f79",
      },
      background: {
        default: mode === "light" ? "#fff5ec" : "#0A1929",
      },
      custom: {
        default: mode === "light" ? "#FFFFFFCC" : "#0A1929",
      },
    },
  });

export default theme;
