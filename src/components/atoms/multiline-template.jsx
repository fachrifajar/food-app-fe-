import React from "react";
import { TextField, useMediaQuery } from "@mui/material";

const MultilineTemplate = ({ sx }) => {
  const isXs = useMediaQuery("(max-width: 600px)");
  return (
    <TextField
      id="filled-multiline-static"
      label="Comments :"
      multiline
      rows={4}
      variant="filled"
      sx={{ width: isXs ? "100%" : "50%", ...sx }}
    />
  );
};

export default MultilineTemplate;
