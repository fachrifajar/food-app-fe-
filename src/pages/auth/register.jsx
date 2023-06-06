import React from "react";
// import material ui
import {
  Typography,
  useTheme,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
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
import { useSelector } from "react-redux";
import {
  INITIAL_STATE,
  formReducer,
} from "../../hook/register/registerReducer";

const Register = () => {
  document.title = "Sign Up";
  const theme = useTheme();
  const navigate = useNavigate();

  const [state, dispatch] = React.useReducer(formReducer, INITIAL_STATE);

  const [mode, setMode] = React.useState(
    localStorage.getItem("selectedTheme") || "dark"
  );
  const [authData, setAuthData] = React.useState(
    useSelector((state) => state.auth?.profile?.data)
  );

  // handle "name" value
  const handleChangeName = (event) => {
    const name = event.target.value;
    const strRegex = /^(?!(?:.*\s){3})[A-Za-z][A-Za-z\s\d]{5,25}$/;

    if (!strRegex.test(name)) {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "name",
          value: {
            value: "",
            isErr: true,
            errMsg:
              "Name must contain only letters & numbers and letters. Start with a letter and be between 5-20 characters long",
          },
        },
      });
    } else {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "name",
          value: {
            value: name,
            isErr: false,
            errMsg: "",
          },
        },
      });
    }
  };

  // handle "email" value
  const handleChangeEmail = (event) => {
    const newValue = event.target.value;
    const strRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!strRegex.test(newValue)) {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "email",
          value: {
            value: "",
            isErr: true,
            errMsg: "Please input Valid Email Address",
          },
        },
      });
    } else {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "email",
          value: {
            value: newValue,
            isErr: false,
            errMsg: "",
          },
        },
      });
    }
  };

  // handle "phone" value
  const handleChangePhone = (event) => {
    const newValue = event.target.value;
    const maxLength = 15;
    const minLength = 10;

    if (newValue.toString().length < minLength) {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "phone",
          value: {
            value: "",
            isErr: true,
            errMsg: "Please input a valid phone with at least 10 digits",
          },
        },
      });
    } else if (newValue.toString().length > maxLength) {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "phone",
          value: {
            value: "",
            isErr: true,
            errMsg: `Phone number should not exceed ${maxLength} characters`,
          },
        },
      });
    } else {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "phone",
          value: {
            value: newValue,
            isErr: false,
            errMsg: "",
          },
        },
      });
    }
  };

  const handleChangePassword = (event) => {
    const newValue = event.target.value;
    const strRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strRegex.test(newValue)) {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "pwd",
          value: {
            value: "",
            isErr: true,
            errMsg:
              "Password min 8 characters & must contain combination of letters, numbers, uppercase and symbol",
          },
        },
      });
    } else {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "pwd",
          value: {
            value: newValue,
            isErr: false,
            errMsg: "",
          },
        },
      });
    }
  };
  // handle "password" value
  const handleClickShowPassword = () => {
    dispatch({ type: "TOGGLE_SHOW_PASSWORD" });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeConfirmPass = (event) => {
    const newValue = event.target.value;

    if (newValue == state.pwd.value.value) {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "confirmPwd",
          value: {
            value: newValue,
            isErr: false,
            errMsg: "",
          },
        },
      });
    } else {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "confirmPwd",
          value: {
            value: "",
            isErr: true,
            errMsg: "Password-Confirmation does'nt match with Password",
          },
        },
      });
    }
  };

  // handle disable button when params "incomplete"
  React.useEffect(() => {
    if (authData) {
      navigate("/");
    }

    if (
      state.name.value.value &&
      state.email.value.value &&
      state.phone.value.value &&
      state.pwd.value.value &&
      state.confirmPwd.value.value &&
      state.isChecked
    ) {
      dispatch({ type: "HANDLE_DISABLED", payload: { isDisabled: false } });
    } else {
      dispatch({ type: "HANDLE_DISABLED", payload: { isDisabled: true } });
    }
  }, [state.isChecked]);

  // handle register button
  const handleRegister = async () => {
    try {
      dispatch({ type: "FETCH_START" });
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        {
          email: state.email.value.value,
          phone_number: state.phone.value.value,
          username: state.name.value.value,
          password: state.pwd.value.value,
        }
      );
      console.log(response);

      dispatch({ type: "FETCH_SUCCESS" });
    } catch (error) {
      console.log("handleRegisterUserERROR", error);

      dispatch({
        type: "FETCH_ERROR",
        payload: { errMsg: error?.response?.data?.message?.message },
      });
    }
  };

  return (
    <>
      <AuthContent>
        <Boxs
          _setTheme={mode}
          _sx={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography variant="h4" color="primary" fontWeight="bold">
            Let's Get Started !
          </Typography>
          <Typography
            variant="body1"
            color="text.contrastText"
            sx={{ fontSize: "18px", margin: "15px 0 20px 0" }}>
            Create new account to access all features
          </Typography>

          <TextFieldTemplate
            label="Name"
            placeholder="Enter your name"
            onChange={handleChangeName}
            error={state.name.value.isErr}
            helperText={state.name.value.errMsg}
            InputProps={{
              inputProps: {
                maxLength: 25,
              },
            }}
          />
          <TextFieldTemplate
            label="Email"
            placeholder="Enter your email"
            onChange={handleChangeEmail}
            error={state.email.value.isErr}
            helperText={state.email.value.errMsg}
          />
          <TextFieldTemplate
            label="Phone Number"
            placeholder="Enter your Phone Number"
            type="number"
            onChange={handleChangePhone}
            error={state.phone.value.isErr}
            helperText={state.phone.value.errMsg}
          />
          <TextFieldTemplate
            label="Password"
            placeholder="Enter your Password"
            type={state.showPwd ? "text" : "password"}
            onChange={handleChangePassword}
            error={state.pwd.value.isErr}
            helperText={state.pwd.value.errMsg}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {state.showPwd ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
              inputProps: {
                maxLength: 20,
              },
            }}
          />
          <TextFieldTemplate
            label="Password Confirmation"
            placeholder="Enter your Password"
            type="password"
            onChange={handleChangeConfirmPass}
            disabled={state.pwd.value.value ? false : true}
            error={state.confirmPwd.value.isErr}
            helperText={state.confirmPwd.value.errMsg}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
            }}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "text.contrastText",
                  }}
                  checked={state.isChecked}
                  onChange={() => dispatch({ type: "TOGGLE_CHECKBOX" })}
                />
              }
              label="I agree to the terms & conditions"
              sx={{
                color: "text.contrastText",
              }}
            />
          </div>
          <ButtonTemplate
            text="Register"
            isLoading={state.isLoading}
            disabled={state.isDisabled}
            onClick={handleRegister}
          />
          <Typography
            variant="subtitle2"
            color="text.contrastText"
            sx={{
              marginTop: "20px",
              "& span": { color: "primary.main", cursor: "pointer" },
            }}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Log in Here</span>
          </Typography>
          <ModalSuccessTemplate
            open={state.isModalSuccessOpen}
            // onClose={() => setIsModalSuccessOpen(false)}
            text="Your account has been created successfully!"
            children={
              <ButtonTemplate
                text="Get Started"
                color="success"
                sx={{ width: "100%" }}
                endIcon={<ArrowRightAltIcon />}
                onClick={() => {
                  navigate("/login");
                }}
              />
            }
          />
          <ModalErrorTemplate
            open={state.isErrModalOpen}
            text={state.errMsgApi.errMsg}
            onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          />
        </Boxs>
      </AuthContent>
    </>
  );
};

export default Register;
