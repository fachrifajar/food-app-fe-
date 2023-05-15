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
