import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import theme from "../../theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

const Boxs = ({ children, _setTheme, _sx }) => {
  const isXs = useMediaQuery("(max-width: 600px)");
  const setTheme = theme(_setTheme);
  return (
    <>
      <Box
        flex={1}
        p={!isXs ? 2 : 0}
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
