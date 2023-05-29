import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as recipeReducer from "./store/reducer/recipe";

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
import SortButton from "./components/molecules/sort-button";
import PaginationTemplate from "./components/molecules/pagination-template";
import SearchResultTemplate from "./components/molecules/search-result-template";

//importing icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function App() {
  document.title = "Home";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isXs = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(min-width: 601px) and (max-width: 930px)");

  const [mode, setMode] = React.useState(localStorage.getItem("selectedTheme"));
  const [inputValue, setInputValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);

  const [newRecipes, setNewRecipes] = React.useState([]);
  const [popRecipes, setPoprecipes] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPages, setCurrentPages] = React.useState(1);
  const [getSortType, setGetSortType] = React.useState(2);

  const fetchSuggestions = async (value) => {
    try {
      if (value && value.length !== 0) {
        const convertedText = value.replace(/\s/g, "-");
        const getRecipes = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/users/recipes/search/${convertedText}`
        );
        setSuggestions(getRecipes?.data?.data);
      }
    } catch (error) {
      console.log("errorFetchSuggestions", error);
    }
  };

  const handleInputChange = (event) => {
    const getValue = event.target.value;

    setInputValue(getValue);

    if (getValue.length !== 0 || inputValue.length !== 0) {
      fetchSuggestions(getValue);
    }
  };

  const handleSuggestionSelect = (event) => {
    const getClickedData = suggestions.filter((item) => item.slug === event);

    dispatch(
      recipeReducer.setSearchRecipe({
        data: getClickedData,
      })
    );
  };

  const fetchContent = async () => {
    try {
      const getRecipes = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/users/recipes/search/?page=1&limit=6&sort=true&sortType=2`
      );
      setNewRecipes(getRecipes?.data?.data?.[0]);
      setPoprecipes(getRecipes?.data?.data);
      setTotalPages(Math.ceil(getRecipes?.data?.total / 6));
    } catch (error) {
      console.log(error, "ERRORfetchContent");
    }
  };

  const fetchClickCard = (slug) => {
    const getClickedDataCard = popRecipes.filter((item) => item.slug === slug);

    dispatch(
      recipeReducer.setRecipe({
        data: getClickedDataCard,
      })
    );

    navigate(`/detail-recipe/${getClickedDataCard?.[0]?.slug}`);
  };

  React.useEffect(() => {
    fetchContent();
    // console.log(newRecipes);
  }, []);

  return (
    <>
      <Navbar _setTheme={mode} getTheme={(e) => setMode(e)} />
      {/* TOP CONTENT */}
      <Boxs
        className="topContent-container"
        _setTheme={mode}
        _sx={{
          height: { md: "120vh", sm: "100vh", xs: "65vh" },
          // padding: 0,
        }}>
        <Grid container spacing={2}>
          <Grid
            className="topContent-left-content"
            item
            xs={8.5}
            sm={5}
            md={3.5}
            sx={{
              marginTop: { md: "30vh", sm: "20vh", xs: "10vh" },
              // marginLeft: "10vw",
            }}>
            <Typography
              className="topContent-title"
              variant="h3"
              fontWeight="bold"
              sx={{ fontSize: { xs: "40px", sm: "40px", md: "50px" } }}>
              Discover Recipe & Delicious Food
            </Typography>

            <TextFieldTemplate
   
              className="topContent-search-field"
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
              }}
              onChange={handleInputChange}
              value={inputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setInputValue(e.target.value);
                  dispatch(
                    recipeReducer.setSearchRecipe({
                      data: suggestions,
                    })
                  );
                  navigate("/search");
                }
              }}
            />
            {inputValue?.length > 0 && (
              <SearchResultTemplate
                result={suggestions}
                onClick={(e) => handleSuggestionSelect(e)}
              />
            )}
          </Grid>
          {!isXs && (
            <Grid
              className="topContent-right-content"
              item
              md={3.5}
              sm={3.5}
              sx={{
                marginLeft: { md: "27vw", sm: "5vw" },
                zIndex: 1,
                marginTop: { md: "150px", sm: "150px" },
              }}>
              <img
                className="topContent-right-image"
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
          {/* RIGHT BACKGROUND */}
          <Box
            className="topContent-right-background"
            sx={{
              height: { md: "120vh", sm: "100vh", xs: "60vh" },
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
          height: { md: "100vh", sm: "100vh", xs: "90vh" },
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
              fontSize: { xs: "28px", sm: "30px", md: "40px" },
              fontWeight: 500,
            }}>
            New Recipe
          </Typography>
        </div>

        {/* LEFT COLOR BACKGROUND */}
        <Box
          className="middleContent-bgcolor"
          sx={{
            bgcolor: "primary.main",
            height: { md: "68vh", sm: "40vh", xs: "23vh" },
            width: { md: "27vw", sm: "40vw", xs: "60vw" },
            position: "absolute",
            left: 0,
            borderRadius: "0 10px 10px 0",
          }}
        />

        <Grid
          container
          spacing={2}
          // direction={isXs ? "column" : "row"}
          // justifyContent="center"
          // alignItems="center"
        >
          <Grid
            item
            md={7}
            sm={7}
            xs={12}
            sx={{
              // NEW RECIPE IMAGE
              "& img": {
                width: isXs ? "65vw" : isSm ? "45vw" : "42vw",
                marginTop: isXs ? "5vh" : "8vh",
                position: "relative",
                borderRadius: "10px",
              },
            }}>
            <img
              className="middleContent-img-content"
              src={`${import.meta.env.VITE_CLOUDINARY_URL}${newRecipes?.photo}`}
              alt="new-recipe-img"
            />
          </Grid>
          <Grid
            item
            md={5}
            sm={5}
            xs={12}
            sx={{
              marginTop: { md: "25vh", sm: "25vh", xs: "0vh" },
              "& .MuiTypography-root": {
                color: "text.secondary",
              },
              "& div": {
                borderBottom: "2px solid",
                width: "15%",
                color: "text.secondary",
                marginTop: "2%",
              },
              position: "relative",
            }}>
            <Typography
              className="middleContent-recipe-title"
              variant="h3"
              component="p"
              sx={{
                fontWeight: 500,
                fontSize: { md: "34px", sm: "30px", xs: "24px" },
              }}>
              {newRecipes?.title}
            </Typography>
            <Typography
              component="p"
              variant="subtitle1"
              sx={{
                fontSize: { md: "16px", sm: "16px", xs: "14px" },
                fontWeight: 400,
                fontStyle: "italic",
              }}>
              *By {newRecipes?.username}
            </Typography>
            <div />
            <Typography
              component="p"
              variant="body1"
              sx={{
                fontSize: { md: "20px", sm: "16px", xs: "16px" },
                fontWeight: 400,
                marginTop: "5%",
              }}>
              Quick + Easy Healthy {newRecipes?.title}? That’s right!
            </Typography>
            <ButtonTemplate
              className="middleContent-button"
              text="Learn More"
              sx={{
                width: "150px",
                borderRadius: "10px",
              }}
            />
          </Grid>
        </Grid>
      </Boxs>

      {/* END OF MIDDLE CONTENT */}

      {/* BOTTOM CONTENT */}
      <Boxs
        className="bottomContent-container"
        _setTheme={mode}
        _sx={{
          height: "100vh",
          marginTop: { md: "10vh", sm: "10vh", xs: "0vh" },
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
              fontSize: { xs: "28px", sm: "30px", md: "40px" },
              fontWeight: 500,
            }}>
            Popular Recipe
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SortButton
            getSortType={(e) => setGetSortType(e)}
            getSortData={(e) => {
              setPoprecipes(e);
            }}
          />
        </div>
        <br />
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          // sx={{display: "flex", justifyContent: "center"}}
        >
          {popRecipes.map((item, key) => (
            <React.Fragment key={key}>
              <Grid item md={4} sm={4} xs={6}>
                <CardTemplate
                  image={`${import.meta.env.VITE_CLOUDINARY_URL}${item?.photo}`}
                  title={item?.title}
                  onClick={() => fetchClickCard(item?.slug)}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PaginationTemplate
            count={totalPages}
            pages={(e) => setCurrentPages(e)}
            fetchedData={(e) => setPoprecipes(e)}
            sortType={getSortType}
          />
        </div>
        <br />
      </Boxs>
    </>
  );
}

export default App;
