import React from "react";
import { TextField, useMediaQuery } from "@mui/material";

const MultilineTemplate = ({
  sx,
  onChange,
  label,
  error,
  helperText,
  InputProps,
  placeholder,
}) => {
  const isXs = useMediaQuery("(max-width: 600px)");
  return (
    <TextField
      placeholder={placeholder}
      id="filled-multiline-static"
      label={label}
      multiline
      rows={4}
      variant="filled"
      error={error}
      helperText={helperText}
      InputProps={{
        sx: {
          color: "text.secondary",
        },
        ...InputProps,
      }}
      onChange={onChange}
      sx={{ width: isXs ? "100%" : "50%", ...sx }}
    />
  );
};

export default MultilineTemplate;
