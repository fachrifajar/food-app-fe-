import { createTheme } from "@mui/material";

const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === "light" ? "#EFC81A" : "#42A5F5",
      },
      secondary: {
        main: mode === "light" ? "#696f79" : "#90CAF9",
      },
      text: {
        primary: mode === "light" ? "#2E266F" : "#FFF",
        secondary: mode === "light" ? "#3F3A3A" : "#E3F2FD",
        contrastText: mode === "light" ? "#696f79" : "#696f79",
      },
      background: {
        default: mode === "light" ? "#FFF5EC" : "#0A1929",
      },
      custom: {
        default: mode === "light" ? "#FFFFFFCC" : "#0A1929",
        default2: mode === "light" ? "#FFF" : "#1A2027",
        default3: mode === "light" ? "#f5ecff" : "#0A1929",
      },
    },
  });

export default theme;
