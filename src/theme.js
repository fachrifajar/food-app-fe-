import { createTheme } from "@mui/material";

const theme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === "light" ? "#EFC81A" : "#f3e5f5",
        contrastText: mode === "light" ? "#EFC81ACC" : "#ce93d8",
      },
      buttonText: {
        main: mode === "light" ? "#fff" : "#1f1f1f",
      },
      text: {
        primary: mode === "light" ? "#2e266f" : "#fff",
        secondary: mode === "light" ? "#3f3a3a" : "rgba(255, 255, 255, 0.7)",
      },
      background: {
        default: mode === "light" ? "#fff5ec" : "#1f1f1f",
      },
    },
  });

export default theme;
