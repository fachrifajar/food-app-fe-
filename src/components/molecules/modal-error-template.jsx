import React from "react";
import { Modal, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

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

const ModalErrorTemplate = ({ open, onClose, text, children }) => {
  return (
    <>
      <MyModal open={open} onClose={onClose}>
        <MyCard>
          <ReportProblemIcon color="error" sx={{ fontSize: "50px" }} />
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ fontSize: { xs: "20px", sm: "24px", md: "24px" }, marginTop: "20px" }}>
            {text}
          </Typography>
        </MyCard>
      </MyModal>
    </>
  );
};

export default ModalErrorTemplate;
