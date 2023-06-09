import React from "react";
import { Modal, Card, Typography, styled } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as authReducer from "../../store/reducer/auth";

// import components
import ButtonTemplate from "../atoms/button-template";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldTemplate from "../atoms/textField-template";
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
  padding: "30px 50px",
  overflowY: "auto",
  width: "100vw",
  [theme.breakpoints.up("md")]: {
    width: "50vw",
  },
}));

const ModalEditComment = ({
  open,
  onClose,
  children,
  _getCommentsId,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalExp, setIsModalExp] = React.useState(false);

  const [authData, setAuthData] = React.useState(
    useSelector((state) => state.auth?.profile?.data?.accessToken)
  );

  const [getCommentValue, setGetCommentValue] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEdit = async () => {
    try {
      setIsLoading(true);
  
      let accessToken = authData;
  
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/users/recipes/edit/comment/${_getCommentsId}`,
          {
            comment: getCommentValue,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
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
          setAuthData(newAccessToken);
  
          accessToken = newAccessToken;
  
          const responseHandleEdit = await axios.patch(
            `${import.meta.env.VITE_BASE_URL}/users/recipes/edit/comment/${_getCommentsId}`,
            {
              comment: getCommentValue,
            },
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
  
          // console.log(responseHandleEdit);
          setIsLoading(false);
          onSuccess(true);
          onClose();
        } else {
          // console.log("ERRORhandleEdit", error);
          setIsLoading(false);
        }
      }
    } catch (error) {
      // console.log("ERRORhandleEdit", error);
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

  React.useEffect(() => {
    if (getCommentValue) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [getCommentValue]);

  return (
    <>
      <MyModal open={open}>
        <MyCard>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}>
            <Typography
              variant="h5"
              color="text.secondary"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "20px", sm: "24px", md: "24px" },
              }}>
              Edit Comment
            </Typography>
            <CloseIcon
              color="action"
              sx={{ cursor: "pointer" }}
              onClick={onClose}
            />
          </div>
          <hr
            style={{
              border: "none",
              borderBottom: "1px solid #ccc",
              marginBottom: "20px",
              width: "100%",
            }}
          />
          <TextFieldTemplate
            label="Comment"
            placeholder="change your comment"
            onChange={(e) => {
              if (e.target.value.length < 5) {
                setIsError(true);
                setGetCommentValue("");
              } else {
                setIsError(false);
                setGetCommentValue(e.target.value);
              }
            }}
            InputProps={{
              inputProps: {
                maxLength: 40,
              },
            }}
            error={isError}
            helperText={isError ? "Comment cannot be less than 5" : null}
            sx={{ display: "flex", width: "100%" }}
          />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonTemplate
              text="Enter"
              sx={{ width: "25%" }}
              disabled={isDisabled}
              onClick={handleEdit}
              isLoading={isLoading}
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

export default ModalEditComment;

