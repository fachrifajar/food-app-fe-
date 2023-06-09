import React from "react";
import { Modal, Card, Typography, styled } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as authReducer from "../../store/reducer/auth";

// import icon
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

// import components
import ButtonTemplate from "../atoms/button-template";
import ModalErrorTemplate from "./modal-error-template";

const MyModal = styled(Modal)(({ theme, sx }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "50%",
  [theme.breakpoints.up("md")]: {
    marginBottom: "10%",
  },
  ...sx,
}));

const MyCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  borderRadius: "20px",
  padding: "20px 40px",
  overflowY: "auto",
  width: "100vw",
  [theme.breakpoints.up("md")]: {
    width: "30vw",
  },
}));

const ModalDelete = ({
  open,
  onClose,
  children,
  _getDeleteId,
  onSuccess,
  title,
  urlParams,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalExp, setIsModalExp] = React.useState(false);

  const [authData, setAuthData] = React.useState(
    useSelector((state) => state.auth?.profile?.data?.accessToken)
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEdit = async () => {
    try {
      setIsLoading(true);

      let accessToken = authData;

      try {
        const response = await axios.delete(
          `${
            import.meta.env.VITE_BASE_URL
          }/users/recipes/delete/${urlParams}/${_getDeleteId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // console.log(response);
        onSuccess(true);

        setIsLoading(false);
        onClose();
      } catch (error) {
        if (error?.response?.status === 401) {
          const refreshTokenResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/auth/token`,
            {
              withCredentials: true, // Include HTTP-only cookies in the request
            }
          );
          const newAccessToken = refreshTokenResponse?.data?.accessToken;

          accessToken = newAccessToken;

          const response = await axios.delete(
            `${
              import.meta.env.VITE_BASE_URL
            }/users/recipes/delete/${urlParams}/${_getDeleteId}`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );

          // console.log(response);
          setIsLoading(false);
          onSuccess(true);
          onClose();
        } else {
          // console.log("ERRORhandleDelete", error);
          setIsLoading(false);
        }
      }
    } catch (error) {
      // console.log("ERRORhandleDelete", error);
      setIsLoading(false);

      if (error?.response?.data?.message === "Invalid refresh token") {
        onClose();
        handleExpModal();
      }
    }
  };

  const handleExpModal = () => {
    setIsModalExp(true);
  };

  return (
    <>
      <MyModal open={open}>
        <MyCard>
          <ReportProblemIcon
            color="error"
            sx={{
              fontSize: "70px",
              marginBottom: "5%",
            }}
          />
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              fontSize: { xs: "20px", sm: "24px", md: "24px" },
              marginBottom: "5%",
            }}>
            {title}
          </Typography>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonTemplate
              text="Cancel"
              sx={{
                marginRight: "10px",
                width: "25%",
                bgcolor: "gray",
                "&:hover": {
                  bgcolor: "darkgray",
                },
              }}
              onClick={onClose}
            />
            <ButtonTemplate
              text="Delete"
              sx={{ width: "25%" }}
              onClick={handleEdit}
              isLoading={isLoading}
              color="error"
            />
          </div>
          <ModalErrorTemplate
            open={isModalExp}
            text="Your session has expired. please Login"
            onClose={() => setIsModalExp(false)}>
            <ButtonTemplate
              text="Login"
              onClick={() => {
                dispatch(authReducer.deleteAuthData());
                navigate("/login");
              }}
            />
          </ModalErrorTemplate>

          {children}
        </MyCard>
      </MyModal>
    </>
  );
};

export default ModalDelete;
