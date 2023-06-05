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
  component,
  variant,
}) => {
  if (isLoading) {
    return (
      <LoadingButton
        fullWidth
        component={component}
        loading={true}
        variant={variant ? variant : "contained"}
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
      component={component}
      fullWidth
      variant={variant ? variant : "contained"}
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
