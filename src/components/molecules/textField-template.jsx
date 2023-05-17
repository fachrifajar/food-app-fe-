import React from "react";
import { TextField } from "@mui/material";

const TextFieldTemplate = ({
  label,
  error,
  placeholder,
  onChange,
  value,
  helperText,
  type,
  InputProps,
  disabled,
}) => {
  return (
    <>
      <TextField
        //   fullWidth
        size="small"
        id="outlined-basic"
        margin="normal"
        variant="outlined"
        disabled={disabled}
        label={label}
        error={error}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        helperText={helperText}
        type={type}
        InputProps={{
          sx: {
            color: "text.secondary",
          },
          ...InputProps,
        }}
        sx={{
          "& label": {
            color: "#46505c",
          },
          "& label.Mui-focused": {
            color: "text.secondary",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#8692a6",
            },
            "&:hover fieldset": {
              borderColor: "secondary",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary",
            },
          },
          width: { xs: "10rem", sm: "20rem", md: "25rem" },
        }}
      />
    </>
  );
};

export default TextFieldTemplate;
