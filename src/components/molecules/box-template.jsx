import React from "react";
import { Box } from "@mui/material";
import theme from "../../theme";

const Boxs = ({ children }) => {
  return (
    <>
      <Box flex={1} p={2}>
        {children}
      </Box>
    </>
  );
};

export default Boxs;
