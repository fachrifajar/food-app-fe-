import React from "react";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const ButtonTemplate = ({ text, onClick, disabled, isLoading }) => {
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
        }}>
        Loading...
      </LoadingButton>
    );
  }

  return (
    <Button
      fullWidth
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      sx={{
        borderRadius: "20px",
        marginTop: "20px",
        color: "white",
      }}>
      {text}
    </Button>
  );
};

export default ButtonTemplate;
