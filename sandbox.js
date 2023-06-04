// import { createTheme } from "@mui/material";

// const theme = (mode) =>
//   createTheme({
//     palette: {
//       mode: mode,
//       primary: {
//         main: "#EFC81A",
//         contrastText: "#EFC81ACC",
//       },
//       text: {
//         primary: "#2e266f",
//         secondary: "#3f3a3a",
//       },
//       ...(mode === "light"
//         ? {
//             background: {
//               default: "#fff5ec",
//             },
//           }
//         : {
//             background: {
//               default: "#1f1f1f",
//             },
//           }),
//     },
//   });

// export default theme;

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import theme from "./theme.js";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router}>
//       <ThemeProvider theme={theme("light")}>
//         <App />
//       </ThemeProvider>
//     </RouterProvider>
//   </React.StrictMode>
// );

//

// import { createTheme } from "@mui/material";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#EFC81A",
//       contrastText: "#EFC81ACC",
//     },
//     text: {
//       primary: "#2e266f",
//       secondary: "#3f3a3a",
//     },
//     mode: "light",
//   },
// });

// export default theme;

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import theme from "./theme.js";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ThemeProvider } from "@mui/material/styles";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <RouterProvider router={router} />
//     </ThemeProvider>
//   </React.StrictMode>
// );

// console.log(new Date().getTime())

// height: !isXs ? (isSm ? "49vw" : "49vw") : "68vh",

// import crypto from 'crypto-browserify';

// // Encryption function
// function encrypt(text, key) {
//   const cipher = crypto.createCipher('aes-256-cbc', key);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return encrypted;
// }

// // Decryption function
// function decrypt(encryptedText, key) {
//   const decipher = crypto.createDecipher('aes-256-cbc', key);
//   let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

// // Example usage
// const title = 'salted-brown-butter-pancake';
// const encryptionKey = 'my-secret-key';

// const encryptedSlug = encrypt(title, encryptionKey);
// console.log('Encrypted Slug:', encryptedSlug);

// const decryptedSlug = decrypt(encryptedSlug, encryptionKey);
// console.log('Decrypted Slug:', decryptedSlug);



//register
// import React from "react";
// // import material ui
// import {
//   Typography,
//   useTheme,
//   InputAdornment,
//   IconButton,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";

// // import icons
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

// // import components
// import Boxs from "../../components/atoms/box-template";
// import AuthContent from "../../components/molecules/AuthContent";
// import TextFieldTemplate from "../../components/atoms/textField-template";
// import ButtonTemplate from "../../components/atoms/button-template";
// import ModalSuccessTemplate from "../../components/molecules/modal-success-template";
// import ModalErrorTemplate from "../../components/molecules/modal-error-template";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { INITIAL_STATE, formReducer } from "../../hook/registerReducer";

// const Register = () => {
//   document.title = "Sign Up";
//   const theme = useTheme();
//   const navigate = useNavigate();

//   const [state, dispatch] = React.useReducer(formReducer, INITIAL_STATE);

//   const [mode, setMode] = React.useState(localStorage.getItem("selectedTheme"));
//   const [authData, setAuthData] = React.useState(
//     useSelector((state) => state.auth?.profile?.data)
//   );

//   const [name, setName] = React.useState(null);
//   const [isErrName, setIsErrName] = React.useState(false);
//   const [errMsgName, setErrMsgName] = React.useState("");

//   const [email, setEmail] = React.useState(null);
//   const [isErrEmail, setIsErrEmail] = React.useState(false);
//   const [errMsgEmail, setErrMsgEmail] = React.useState("");

//   const [phone, setPhone] = React.useState(null);
//   const [isErrPhone, setIsErrPhone] = React.useState(false);
//   const [errMsgPhone, setErrMsgPhone] = React.useState("");

//   const [password, setPassword] = React.useState(null);
//   const [isErrPassword, setIsErrPassword] = React.useState(false);
//   const [errMsgPassword, setErrMsgPassword] = React.useState("");
//   const [showPassword, setShowPassword] = React.useState(false);

//   const [confirmPassword, setConfirmPassword] = React.useState(null);
//   const [issErrConfirmPassword, setIssErrConfirmPassword] =
//     React.useState(false);
//   const [errMsgConfirmPassword, setErrMsgConfirmPassword] = React.useState("");

//   const [isChecked, setIsChecked] = React.useState(false);
//   const [isDisabled, setIsDisabled] = React.useState(true);
//   const [isLoading, setIsLoading] = React.useState(false);

//   const [errMsgApi, setErrMsgApi] = React.useState(null);
//   const [isModalErrOpen, setIsModalErrOpen] = React.useState(false);
//   const [isModalSuccessOpen, setIsModalSuccessOpen] = React.useState(false);

//   // handle "password" value
//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleChangePassword = (event) => {
//     const newValue = event.target.value;
//     const strRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!strRegex.test(newValue)) {
//       setErrMsgPassword(
//         "Password must contain combination of letters, numbers, uppercase and symbol"
//       );
//       setIsErrPassword(true);
//       setPassword(null);
//       return;
//     }
//     setIsErrPassword(false);
//     setPassword(newValue);
//   };

//   const handleChangeConfirmPass = (event) => {
//     const newValue = event.target.value;

//     if (newValue == password) {
//       setIssErrConfirmPassword(false);
//       setConfirmPassword(newValue);
//     } else {
//       setIssErrConfirmPassword(true);
//       setErrMsgConfirmPassword(
//         "Password-Confirmation does'nt match with Password"
//       );
//       setConfirmPassword(null);
//       return;
//     }
//   };

//   // handle "name" value
//   const handleChangeName = (event) => {
//     const name = event.target.value;
//     const strRegex = /^(?!(?:.*\s){3})[A-Za-z][A-Za-z\s\d]{2,25}$/;
//     // if (!strRegex.test(name)) {
//     //   setErrMsgName(
//     //     "Name must contain only letters & numbers and letters. Start with a letter and be between 3-20 characters long"
//     //   );
//     //   setIsErrName(true);
//     //   setName(null);
//     //   return;
//     // }
//     // setIsErrName(false);
//     // setName(name);

//     if (!strRegex.test(name)) {
//       dispatch({
//         type: "CHANGE_INPUT",
//         payload: {
//           name: "name",
//           value: {
//             value: name,
//             isErr: true,
//             errMsg:
//               "Name must contain only letters & numbers and letters. Start with a letter and be between 3-20 characters long",
//           },
//         },
//       });
//     } else {
//       dispatch({
//         type: "CHANGE_INPUT",
//         payload: {
//           name: "name",
//           value: {
//             value: name,
//             isErr: false,
//             errMsg: "",
//           },
//         },
//       });
//     }
//   };
//   console.log(state);
//   // handle "email" value
//   const handleChangeEmail = (event) => {
//     const newValue = event.target.value;
//     const strRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!strRegex.test(newValue)) {
//       setErrMsgEmail("Please input Valid Email Address");
//       setIsErrEmail(true);
//       setEmail(null);
//       return;
//     }
//     setIsErrEmail(false);
//     setEmail(newValue);
//   };

//   // handle "phone" value
//   const handleChangePhone = (event) => {
//     const newValue = event.target.value;
//     const maxLength = 15;
//     const minLength = 10;
//     if (newValue.toString().length < minLength) {
//       setErrMsgPhone("Please input a valid phone with at least 10 digits.");
//       setIsErrPhone(true);
//       setPhone(null);
//       return;
//     }
//     if (newValue.toString().length > maxLength) {
//       setPhone(newValue.toString().slice(0, maxLength));
//       setIsErrPhone(true);
//       setErrMsgPhone(`Phone number should not exceed ${maxLength} characters.`);
//       return;
//     }
//     setPhone(newValue);
//     setIsErrPhone(false);
//   };

//   // handle disable button when params "incomplete"
//   React.useEffect(() => {
//     if (authData) {
//       navigate("/");
//     }

//     if (name && email && phone && password && confirmPassword && isChecked) {
//       setIsDisabled(false);
//     } else {
//       setIsDisabled(true);
//     }
//   }, [name, email, phone, password, confirmPassword, isChecked]);

//   // handle success modal
//   const handleSuccessModal = () => {
//     setIsModalSuccessOpen(true);
//   };

//   const handleErrModal = () => {
//     setIsModalErrOpen(true);
//   };

//   // handle register button
//   const handleRegister = async () => {
//     try {
//       setIsLoading(true);

//       setErrMsgApi(null);
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/users/register`,
//         {
//           email,
//           phone_number: phone,
//           username: name,
//           password,
//         }
//       );
//       setIsLoading(false);
//       handleSuccessModal();
//       setIsModalErrOpen(false);
//       // redirect("/login");
//     } catch (error) {
//       console.log("handleRegisterUserERROR", error);
//       setIsLoading(false);
//       handleErrModal();
//       setErrMsgApi(error?.response?.data?.message?.message);
//     }
//   };

//   return (
//     <>
//       <AuthContent>
//         <Boxs
//           _setTheme={mode}
//           _sx={{
//             marginTop: "50px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}>
//           <Typography variant="h4" color="primary" fontWeight="bold">
//             Let's Get Started !
//           </Typography>
//           <Typography
//             variant="body1"
//             color="text.contrastText"
//             sx={{ fontSize: "18px", margin: "15px 0 20px 0" }}>
//             Create new account to access all features
//           </Typography>

//           <TextFieldTemplate
//             label="Name"
//             placeholder="Enter your name"
//             onChange={handleChangeName}
//             error={state.name.value.isErr} // useReducer
//             helperText={state.name.value.errMsg} // useReducer
//             // error={isErrName ? true : false}
//             // helperText={isErrName ? errMsgName : null}
//             InputProps={{
//               inputProps: {
//                 maxLength: 25,
//               },
//             }}
//           />
//           <TextFieldTemplate
//             label="Email"
//             placeholder="Enter your email"
//             onChange={handleChangeEmail}
//             error={isErrEmail ? true : false}
//             helperText={isErrEmail ? errMsgEmail : null}
//           />
//           <TextFieldTemplate
//             label="Phone Number"
//             placeholder="Enter your Phone Number"
//             type="number"
//             onChange={handleChangePhone}
//             error={isErrPhone ? true : false}
//             helperText={isErrPhone ? errMsgPhone : null}
//           />
//           <TextFieldTemplate
//             label="Password"
//             placeholder="Enter your Password"
//             type={showPassword ? "text" : "password"}
//             onChange={handleChangePassword}
//             error={isErrPassword ? true : false}
//             helperText={isErrPassword ? errMsgPassword : null}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}>
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//               inputProps: {
//                 maxLength: 20,
//               },
//             }}
//           />
//           <TextFieldTemplate
//             label="Password Confirmation"
//             placeholder="Enter your Password"
//             type="password"
//             onChange={handleChangeConfirmPass}
//             disabled={password ? false : true}
//             error={issErrConfirmPassword ? true : false}
//             helperText={issErrConfirmPassword ? errMsgConfirmPassword : null}
//           />
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-start",
//               width: "100%",
//             }}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   sx={{
//                     color: "text.contrastText",
//                   }}
//                 />
//               }
//               label="I agree to the terms & conditions"
//               onChange={() => {
//                 setIsChecked(!isChecked);
//               }}
//               sx={{
//                 color: "text.contrastText",
//               }}
//             />
//           </div>
//           <ButtonTemplate
//             text="Register"
//             isLoading={isLoading}
//             disabled={isDisabled}
//             onClick={handleRegister}
//           />
//           <Typography
//             variant="subtitle2"
//             color="text.contrastText"
//             sx={{
//               marginTop: "20px",
//               "& span": { color: "primary.main", cursor: "pointer" },
//             }}>
//             Already have an account?{" "}
//             <span onClick={() => navigate("/login")}>Log in Here</span>
//           </Typography>
//           <ModalSuccessTemplate
//             open={isModalSuccessOpen}
//             // onClose={() => setIsModalSuccessOpen(false)}
//             text="Your account has been created successfully!"
//             children={
//               <ButtonTemplate
//                 text="Get Started"
//                 color="success"
//                 sx={{ width: "100%" }}
//                 endIcon={<ArrowRightAltIcon />}
//                 onClick={() => {
//                   navigate("/login");
//                 }}
//               />
//             }
//           />
//           <ModalErrorTemplate
//             open={isModalErrOpen}
//             text={errMsgApi}
//             onClose={() => setIsModalErrOpen(false)}
//           />
//         </Boxs>
//       </AuthContent>
//     </>
//   );
// };

// export default Register;
