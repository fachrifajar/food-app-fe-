import React from "react";
// import material ui
import {
  Typography,
  useTheme,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";

// import icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import components
import Boxs from "../../components/molecules/box-template";
import AuthContent from "../../components/organisms/AuthContent";
import TextFieldTemplate from "../../components/molecules/textField-template";
import ButtonTemplate from "../../components/molecules/button-template";
import ModalSuccessTemplate from "../../components/molecules/modal-success-template";

import axios from "axios";
import { redirect } from "react-router-dom";

const Register = () => {
  document.title = "Sign Up";
  const theme = useTheme();

  const [mode, setMode] = React.useState("light");

  const [name, setName] = React.useState(null);
  const [isErrName, setIsErrName] = React.useState(false);
  const [errMsgName, setErrMsgName] = React.useState("");

  const [email, setEmail] = React.useState(null);
  const [isErrEmail, setIsErrEmail] = React.useState(false);
  const [errMsgEmail, setErrMsgEmail] = React.useState("");

  const [phone, setPhone] = React.useState(null);
  const [isErrPhone, setIsErrPhone] = React.useState(false);
  const [errMsgPhone, setErrMsgPhone] = React.useState("");

  const [password, setPassword] = React.useState(null);
  const [isErrPassword, setIsErrPassword] = React.useState(false);
  const [errMsgPassword, setErrMsgPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [issErrConfirmPassword, setIssErrConfirmPassword] =
    React.useState(false);
  const [errMsgConfirmPassword, setErrMsgConfirmPassword] = React.useState("");

  const [isChecked, setIsChecked] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);


  const [errMsgApi, setErrMsgApi] = React.useState(null);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = React.useState(false);

  // handle "password" value
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = (event) => {
    const newValue = event.target.value;
    const strRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strRegex.test(newValue)) {
      setErrMsgPassword(
        "Password must contain combination of letters, numbers, uppercase and symbol"
      );
      setIsErrPassword(true);
      setPassword(null);
      return;
    }
    setIsErrPassword(false);
    setPassword(newValue);
  };

  const handleChangeConfirmPass = (event) => {
    const newValue = event.target.value;

    if (newValue == password) {
      setIssErrConfirmPassword(false);
      setConfirmPassword(newValue);
    } else {
      setIssErrConfirmPassword(true);
      setErrMsgConfirmPassword(
        "Password-Confirmation does'nt match with Password"
      );
      setConfirmPassword(null);
      return;
    }
  };

  // handle "name" value
  const handleChangeName = (event) => {
    const name = event.target.value;
    const strRegex = /^(?!(?:.*\s){3})[A-Za-z][A-Za-z\s\d]{2,25}$/;
    if (!strRegex.test(name)) {
      setErrMsgName(
        "Name must contain only letters & numbers and letters. Start with a letter and be between 3-20 characters long"
      );
      setIsErrName(true);
      setName(null);
      return;
    }
    setIsErrName(false);
    setName(name);
  };

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

  // handle "phone" value
  const handleChangePhone = (event) => {
    const newValue = event.target.value;
    const maxLength = 12;
    if (newValue.toString().length < maxLength) {
      setErrMsgPhone("Please input a valid phone with at least 12 digits.");
      setIsErrPhone(true);
      setPhone(null);
      return;
    }
    if (newValue.toString().length > maxLength) {
      setPhone(newValue.toString().slice(0, maxLength));
      setIsErrPhone(true);
      setErrMsgPhone(`Phone number should not exceed ${maxLength} characters.`);
      return;
    }
    setPhone(newValue);
    setIsErrPhone(false);
  };

  // handle disable button when params "incomplete"
  React.useEffect(() => {
    if (name && email && phone && password && confirmPassword && isChecked) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, email, phone, password, confirmPassword, isChecked]);

  // handle success modal
  const handleSuccessModal = () => {
    setIsModalSuccessOpen(true);
  };

  // handle register button
  const handleRegister = async () => {
    try {
      setIsLoading(true);

      setErrMsgApi(null);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        {
          email,
          phone_number: phone,
          username: name,
          password,
        }
      );
      setIsLoading(false);
      handleSuccessModal()
      // redirect("/login");
    } catch (error) {
      console.log("handleRegisterUserERROR", error);
      setIsLoading(false);

      setErrMsgApi(error?.response?.data?.message?.message);
    }
  };

  // React.useEffect(() => {
  //   const getRefreshToken = async () => {
  //     try {
  //       const response = await fetch('https://food-app.cyclic.app/getRefreshToken', {
  //         method: 'GET',
  //         credentials: 'include',
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         const refreshToken = data.refreshToken;
  //         console.log({ refreshToken });
  //       } else {
  //         throw new Error('Failed to retrieve refresh token');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getRefreshToken();
  // }, []);

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
          {errMsgApi && (
            <Alert variant="filled" severity="error">
              {errMsgApi}
            </Alert>
          )}

          <TextFieldTemplate
            label="Name"
            placeholder="Enter your name"
            onChange={handleChangeName}
            error={isErrName ? true : false}
            helperText={isErrName ? errMsgName : null}
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
            error={isErrEmail ? true : false}
            helperText={isErrEmail ? errMsgEmail : null}
          />
          <TextFieldTemplate
            label="Phone Number"
            placeholder="Enter your Phone Number"
            type="number"
            onChange={handleChangePhone}
            error={isErrPhone ? true : false}
            helperText={isErrPhone ? errMsgPhone : null}
          />
          <TextFieldTemplate
            label="Password"
            placeholder="Enter your Password"
            type={showPassword ? "text" : "password"}
            onChange={handleChangePassword}
            error={isErrPassword ? true : false}
            helperText={isErrPassword ? errMsgPassword : null}
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
          <TextFieldTemplate
            label="Password Confirmation"
            placeholder="Enter your Password"
            type="password"
            onChange={handleChangeConfirmPass}
            disabled={password ? false : true}
            error={issErrConfirmPassword ? true : false}
            helperText={issErrConfirmPassword ? errMsgConfirmPassword : null}
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
                />
              }
              label="I agree to the terms & conditions"
              onChange={() => {
                setIsChecked(!isChecked);
              }}
              sx={{
                color: "text.contrastText",
              }}
            />
          </div>
          <ButtonTemplate
            text="Register"
            isLoading={isLoading}
            disabled={isDisabled}
            onClick={handleRegister}
          />
          <Typography
            variant="subtitle2"
            color="text.contrastText"
            sx={{
              marginTop: "20px",
              "& span": { color: "primary.main", cursor: "pointer" },
            }}>
            Already have an account? <span>Log in Here</span>
          </Typography>
          <ModalSuccessTemplate
            open={isModalSuccessOpen}
            // onClose={() => setIsModalSuccessOpen(false)}
          />
        </Boxs>
      </AuthContent>
    </>
  );
};

export default Register;
