import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import * as recipeReducer from "../store/reducer/recipe";

import Navbar from "../components/organisms/navbar";
import Boxs from "../components/atoms/box-template";
import CardTemplate from "../components/molecules/card-template";

const Search = () => {
  document.title = "Search";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useSelector((state) => state?.recipe?.searchRecipeData?.data);
  const [mode, setMode] = React.useState(
    localStorage.getItem("selectedTheme") || "dark"
  );
  const [getRecipeData, setGetRecipeData] = React.useState(getData);

  return (
    <>
      <Navbar _setTheme={mode} getTheme={(e) => setMode(e)} />
      <Boxs
        className="topContent-container"
        _setTheme={mode}
        // _sx={{
        //   height: { md: "100vh", sm: "100vh", xs: "65vh" },
        // }}
      >
        {getRecipeData.length ? (
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: "10vh" }}>
            {getRecipeData?.map((item, key) => (
              <React.Fragment key={key}>
                <Grid item md={4} sm={4} xs={6}>
                  <CardTemplate
                    image={`${import.meta.env.VITE_CLOUDINARY_URL}${
                      item?.photo
                    }`}
                    title={item?.title}
                    onClick={() => {
                      dispatch(
                        recipeReducer.setRecipe({
                          data: [item],
                        })
                      );

                      navigate(`/detail-recipe/${item?.slug}`);
                    }}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h3"
            align="center"
            sx={{
              marginTop: "30vh",
            }}>
            Recipe's not found
          </Typography>
        )}
      </Boxs>
    </>
  );
};

export default Search;
