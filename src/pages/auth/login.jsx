import React from "react";

import {
  Typography,
  useTheme,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";

// import icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

// import components
import Boxs from "../../components/atoms/box-template";
import AuthContent from "../../components/molecules/AuthContent";
import TextFieldTemplate from "../../components/atoms/textField-template";
import ButtonTemplate from "../../components/atoms/button-template";
import ModalSuccessTemplate from "../../components/molecules/modal-success-template";
import ModalErrorTemplate from "../../components/molecules/modal-error-template";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as authReducer from "../../store/reducer/auth";

const Login = () => {
  document.title = "Login";
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isXs = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(min-width: 601px) and (max-width: 930px)");

  const [mode, setMode] = React.useState(localStorage.getItem("selectedTheme"));
  const [authData, setAuthData] = React.useState(
    useSelector((state) => state.auth?.profile?.data)
  );

  const [email, setEmail] = React.useState(null);
  const [isErrEmail, setIsErrEmail] = React.useState(false);
  const [errMsgEmail, setErrMsgEmail] = React.useState("");

  const [password, setPassword] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const [errMsgApi, setErrMsgApi] = React.useState(null);
  const [successMsgApi, setSuccessMsgApi] = React.useState("");
  const [isModalErrOpen, setIsModalErrOpen] = React.useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = React.useState(false);

  // handle "email" value
  const handleChangeEmail = (event) => {
    const newValue = event.target.value;
    const strRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!strRegex.test(newValue)) {
      setErrMsgEmail("Please input Valid Email Address");
      setIsErrEmail(true);
      setEmail(null);
      return;
    }
    setIsErrEmail(false);
    setEmail(newValue);
  };

  // handle "password" value
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = (event) => {
    const newValue = event.target.value;
    setPassword(newValue);
  };

  const handleSuccessModal = () => {
    setIsModalSuccessOpen(true);
  };

  const handleErrModal = () => {
    setIsModalErrOpen(true);
  };

  // handle disable button when params "incomplete"
  React.useEffect(() => {
    if (authData) {
      navigate("/");
    }

    if (email && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  // handle register button
  const handleLogin = async () => {
    try {
      setIsLoading(true);

      setErrMsgApi(null);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      console.log(response);
      // setAuthProfile
      dispatch(
        authReducer.setAuthProfile({
          data: response?.data?.data,
        })
      );

      setSuccessMsgApi(response?.data?.message);
      setIsLoading(false);
      handleSuccessModal();
      setIsModalErrOpen(false);
    } catch (error) {
      console.log("handleLoginUserERROR", error);
      setIsLoading(false);
      handleErrModal();

      const errMsg = error?.response?.data?.message?.message;

      if (errMsg) {
        setErrMsgApi(errMsg);
      } else {
        setErrMsgApi("500 - Internal server error. Please try again");
      }
    }
  };

  return (
    <>
      <AuthContent>
        <Boxs
          _setTheme={mode}
          _sx={{
            marginTop: !isXs && !isSm ? "150px" : "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography variant="h4" color="primary" fontWeight="bold">
            Welcome !
          </Typography>
          <Typography
            variant="body1"
            color="text.contrastText"
            sx={{ fontSize: "18px", margin: "15px 0 20px 0" }}>
            Log in into your existing account
          </Typography>

          <TextFieldTemplate
            label="Email"
            placeholder="Enter your email"
            onChange={handleChangeEmail}
            error={isErrEmail ? true : false}
            helperText={isErrEmail ? errMsgEmail : null}
          />

          <TextFieldTemplate
            label="Password"
            placeholder="Enter your Password"
            type={showPassword ? "text" : "password"}
            onChange={handleChangePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
              inputProps: {
                maxLength: 20,
              },
            }}
          />

          <ButtonTemplate
            text="Login"
            isLoading={isLoading}
            disabled={isDisabled}
            onClick={handleLogin}
          />
          <Typography
            variant="subtitle2"
            color="text.contrastText"
            sx={{
              marginTop: "20px",
              "& span": { color: "primary.main", cursor: "pointer" },
            }}>
            Dont have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign up here</span>
          </Typography>
          <ModalSuccessTemplate
            open={isModalSuccessOpen}
            // onClose={() => setIsModalSuccessOpen(false)}
            text={successMsgApi}
            children={
              <ButtonTemplate
                text="Get Started"
                color="success"
                sx={{ width: "100%" }}
                endIcon={<ArrowRightAltIcon />}
                onClick={() => {
                  navigate("/");
                }}
              />
            }
          />
          <ModalErrorTemplate
            open={isModalErrOpen}
            text={errMsgApi}
            onClose={() => setIsModalErrOpen(false)}
          />
        </Boxs>
      </AuthContent>
    </>
  );
};

export default Login;
