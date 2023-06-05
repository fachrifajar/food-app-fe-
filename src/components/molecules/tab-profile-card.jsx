import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Tab, Tabs, Typography, Grid } from "@mui/material";

// importing components
import CardTemplate from "./card-template";
import SortButton from "./sort-button";
import PaginationTemplate from "./pagination-template";

const TabProfileCard = () => {
  const [value, setValue] = React.useState(0);
  const [getUserData, setGetUserData] = React.useState(
    useSelector((state) => state.auth?.profile?.data)
  );
  const [myRecipes, setMyRecipes] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState([]);
  const [currentPages, setCurrentPages] = React.useState(1);
  const [getSortType, setGetSortType] = React.useState("createdDesc");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchContent = async () => {
    try {
      const getRecipes = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/recipes/search/myrecipe/${
          getUserData?.accounts_id
        }?page=1&limit=3&sort=true&sortType=createdDesc`
      );

      setMyRecipes(getRecipes?.data?.data);
      setTotalPages(Math.ceil(getRecipes?.data?.total / 6));

      console.log(getRecipes?.data?.data);
    } catch (error) {
      console.log(error, "ERRORfetchContent");
    }
  };

  React.useEffect(() => {
    fetchContent();
  }, []);

  return (
    <>
      <Typography component="div" sx={{ marginTop: "2%" }}>
        <Tabs
          sx={{
            marginBottom: "5%",
          }}
          value={value}
          onChange={handleChange}
          centered
          variant="fullWidth"
          textColor="secondary"
          indicatorColor="secondary">
          <Tab label="My Recipes" />
          <Tab label="Liked Recipes" />
        </Tabs>
        {value === 0 ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "5%",
              }}>
              <SortButton
                urlParams={`/users/recipes/search/myrecipe/${getUserData?.accounts_id}?page=1&limit=3&sort=true&sortType=`}
                getSortType={(e) => setGetSortType(e)}
                getSortData={(e) => {
                  setMyRecipes(e);
                }}
              />
            </div>

            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center">
              {myRecipes?.map((item, key) => {
                const date = new Date(item?.created_at);
                const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                const formattedDate = new Intl.DateTimeFormat(
                  "id-ID",
                  options
                ).format(date);

                return (
                  <React.Fragment key={key}>
                    <Grid item md={4} sm={4} xs={12}>
                      <CardTemplate
                        image={`${import.meta.env.VITE_CLOUDINARY_URL}${
                          item?.photo
                        }`}
                        title={item?.title}
                        onClick={() => fetchClickCard(item?.slug)}>
                        {/* <br /> */}
                        <Typography
                          component="div"
                          textAlign="left"
                          sx={{
                            marginTop: "4%",
                            maxWidth: "100%",
                          }}>
                          <Typography component="ul">
                            <li>Created Date : {formattedDate}</li>
                            <li style={{ padding: 0 }}>
                              Count of Likes : {item?.love}
                            </li>
                          </Typography>
                        </Typography>
                      </CardTemplate>
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5%",
              }}>
              <PaginationTemplate
                count={totalPages}
                pages={(e) => setCurrentPages(e)}
                fetchedData={(e) => setMyRecipes(e)}
                sortType={getSortType}
                urlParams={`/users/recipes/search/myrecipe/${getUserData?.accounts_id}`}
                limit="3"
              />
            </div>
            <br />
          </>
        ) : null}
      </Typography>
    </>
  );
};

export default TabProfileCard;
