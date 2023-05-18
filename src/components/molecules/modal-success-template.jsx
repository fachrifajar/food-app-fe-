import React from "react";
import { Modal, Card, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ButtonTemplate from "./button-template";
import { useNavigate } from "react-router-dom";

const MyModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const MyCard = styled(Card)({
  textAlign: "center",
  borderRadius: "20px",
  padding: "30px 50px",
  overflowY: "auto",
});

const ModalSuccessTemplate = ({ open, onClose }) => {
  const navigate = useNavigate();
  return (
    <>
      <MyModal open={open} onClose={onClose}>
        <MyCard>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: "50px" }} />
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ fontSize: { xs: "20px", sm: "24px", md: "24px" } }}>
            Your account has been created successfully!
          </Typography>
          <ButtonTemplate
            text="Get Started"
            color="success"
            sx={{ width: "50%" }}
            endIcon={<ArrowRightAltIcon />}
            onClick={() => {
              navigate("/login")
              console.log("masuk");
            }}
          />
        </MyCard>
      </MyModal>
    </>
  );
};

export default ModalSuccessTemplate;
