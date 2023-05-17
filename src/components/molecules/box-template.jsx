import React from "react";
import { Box } from "@mui/material";
import theme from "../../theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

const Boxs = ({ children, _setTheme, _sx }) => {
  const setTheme = theme(_setTheme);
  return (
    <>
      <Box
        flex={1}
        p={2}
        sx={{
          ..._sx,
        }}>
        <ThemeProvider theme={setTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Box>
    </>
  );
};

export default Boxs;
