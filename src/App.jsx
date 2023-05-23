import React from "react";
import axios from "axios";

import {
  Typography,
  Grid,
  Box,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";

//importing components
import Navbar from "./components/organisms/navbar";
import Boxs from "./components/atoms/box-template";
import TextFieldTemplate from "./components/atoms/textField-template";

//importing icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function App() {
  document.title = "Home";
  const isXs = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(min-width: 601px) and (max-width: 930px)");
  const [mode, setMode] = React.useState(localStorage.getItem("selectedTheme"));

  return (
    <>
      <Navbar _setTheme={mode} getTheme={(e) => setMode(e)} />
      <Boxs _setTheme={mode} _sx={{ height: "100vh", padding: 0 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={8.5}
            sm={5}
            md={3.5}
            sx={{
              marginTop: { md: "30vh", sm: "20vh", xs: "10vh" },
              marginLeft: "10vw",
            }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ fontSize: { xs: "40px", sm: "40px" } }}>
              Discover Recipe & Delicious Food
            </Typography>
            <TextFieldTemplate
              placeholder="Search Recipe..."
              sx={{
                bgcolor: "custom.default",
                width: { xs: "100%" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}></TextFieldTemplate>
          </Grid>
          {!isXs && (
            <Grid
              item
              md={3.5}
              sm={3.5}
              sx={{
                marginLeft: { md: "23vw", sm: "5vw" },
                zIndex: 1,
                marginTop: { md: "150px", sm: "150px" },
              }}>
              <img
                src="header-fix-2.png"
                alt="header img"
                style={{
                  width: isSm ? "50%" : "500px",
                  position: "absolute",
                  filter: mode === "dark" ? "grayscale(15%)" : "none",
                }}
              />
            </Grid>
          )}

          <Box
            sx={{
              height: { md: "100vh", sm: "100vh", xs: "70vh" },
              width: { md: "20vw", sm: "25vw", xs: "15vw" },
              position: "absolute",
              backgroundColor: "primary.main",
              zIndex: 0,
              right: 0,
              top: 0,
            }}></Box>
        </Grid>
      </Boxs>
    </>
  );
}

export default App;
