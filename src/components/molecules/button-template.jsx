import React from "react";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const ButtonTemplate = ({
  text,
  onClick,
  disabled,
  isLoading,
  sx,
  color,
  endIcon,
}) => {
  if (isLoading) {
    return (
      <LoadingButton
        fullWidth
        loading={true}
        variant="contained"
        disabled={disabled}
        onClick={onClick}
        sx={{
          borderRadius: "20px",
          marginTop: "20px",
          color: "white",
          ...sx,
        }}>
        Loading...
      </LoadingButton>
    );
  }

  return (
    <Button
      color={color}
      fullWidth
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      endIcon={endIcon}
      sx={{
        borderRadius: "20px",
        marginTop: "20px",
        color: "white",
        ...sx,
      }}>
      {text}
    </Button>
  );
};

export default ButtonTemplate;
