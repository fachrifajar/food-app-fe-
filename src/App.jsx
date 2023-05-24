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
import CardTemplate from "./components/molecules/card-template";
import ButtonTemplate from "./components/atoms/button-template";

//importing icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function App() {
  document.title = "Home";
  const isXs = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(min-width: 601px) and (max-width: 930px)");
  const cloudinaryEndpoint =
    "https://res.cloudinary.com/daouvimjz/image/upload/";

  const [mode, setMode] = React.useState(localStorage.getItem("selectedTheme"));
  const [newRecipes, setNewRecipes] = React.useState([]);

  const fetchContent = async () => {
    try {
      const getNewRecipes = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/users/recipes/search/?page=1&limit=1&sort=true&sortType=2`
      );
      setNewRecipes(getNewRecipes?.data?.data?.[0]);
    } catch (error) {
      console.log(error, "ERRORfetchContent");
    }
  };

  React.useEffect(() => {
    fetchContent();
    console.log(newRecipes);
  }, []);

  return (
    <>
      <Navbar _setTheme={mode} getTheme={(e) => setMode(e)} />
      {/* TOP CONTENT */}
      <Boxs
        _setTheme={mode}
        _sx={{
          height: { md: "120vh", sm: "120vh", xs: "70vh" },
          // padding: 0,
        }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={8.5}
            sm={5}
            md={3.5}
            sx={{
              marginTop: { md: "30vh", sm: "20vh", xs: "20vh" },
              // marginLeft: "10vw",
            }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ fontSize: { xs: "40px", sm: "40px", md: "50px" } }}>
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
                marginLeft: { md: "27vw", sm: "5vw" },
                zIndex: 1,
                marginTop: { md: "150px", sm: "150px" },
              }}>
              <img
                src="header-fix-4.png"
                alt="header img"
                style={{
                  width: isSm ? "50%" : "500px",
                  position: "absolute",
                  filter: mode === "dark" ? "grayscale(15%)" : "none",
                }}
              />
            </Grid>
          )}
          {/* RIGHT YELLOW BACKGROUND */}
          <Box
            sx={{
              height: { md: "120vh", sm: "120vh", xs: "70vh" },
              width: { md: "20vw", sm: "25vw", xs: "15vw" },
              position: "absolute",
              backgroundColor: "primary.main",
              zIndex: 0,
              right: 0,
              top: 0,
            }}
          />
        </Grid>
      </Boxs>
      {/* END OF TOP CONTENT */}
      {/* MIDDLE CONTENT */}
      <Boxs
        className="middleContent-container"
        _setTheme={mode}
        _sx={{
          height: "100vh",
          "& img": {
            position: "absolute",
            borderRadius: "10px",
            width: "40vw",
            marginTop: "8vh",
          },
        }}>
        {/* TITLE CONTAINER */}
        <div
          className="middleContent-titleContainer"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "50px",
          }}>
          {/* TITLE BGCOLOR */}
          <Box
            className="middleContent-title-bgColor"
            sx={{
              bgcolor: "primary.main",
              height: !isXs ? "80px" : "60px",
              width: !isXs ? "15px" : "10px",
            }}
          />
          {/* TITLE  */}
          <Typography
            className="middleContent-title"
            color="text.secondary"
            sx={{
              marginLeft: !isXs ? "30px" : "20px",
              fontSize: !isXs ? "40px" : "28px",
              fontWeight: 500,
            }}>
            New Recipe
          </Typography>
        </div>

        {/* LEFT YELLOW BACKGROUND */}
        <Box
          className="middleContent-bgcolor"
          sx={{
            bgcolor: "primary.main",
            height: !isXs ? "68vh" : "50vw",
            width: !isXs ? "27vw" : "47vw",
            position: "absolute",
            left: 0,
            borderRadius: "0 10px 10px 0",
          }}
        />
        {/* <CardTemplate /> */}

        <Grid container spacing={2}>
          <Grid item md={7} xs={7}>
            <img
              className="middleContent-img-content"
              src={`${cloudinaryEndpoint}${newRecipes?.photo}`}
              alt="new-recipe-img"
            />
          </Grid>
          <Grid
            item
            md={5}
            xs={5}
            sx={{
              marginTop: "25vh",
              "& .MuiTypography-root": {
                color: "text.secondary",
              },
              "& div": {
                borderBottom: "2px solid",
                width: "15%",
                color: "text.secondary",
                marginTop: "2%",
              },
            }}>
            <Typography
              variant="h3"
              component="p"
              sx={{
                fontWeight: 500,
                fontSize: "34px",
              }}>
              {newRecipes?.title}
            </Typography>
            <Typography
              component="p"
              variant="subtitle1"
              sx={{ fontSize: "26px", fontWeight: 400 }}>
              (Quick & Easy)
            </Typography>
            <div />
            <Typography
              component="p"
              variant="body1"
              sx={{ fontSize: "20px", fontWeight: 400, marginTop: "5%" }}>
              Quick + Easy Healthy Mix Fried Rice? That’s right!
            </Typography>
            <ButtonTemplate text="Learn More" sx={{ width: "150px", borderRadius: "10px" }} />
          </Grid>
        </Grid>
      </Boxs>
    </>
  );
}

export default App;
