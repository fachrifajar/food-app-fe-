import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

// import components
import Navbar from "../components/organisms/navbar";
import Boxs from "../components/atoms/box-template";
import MultilineTemplate from "../components/atoms/multiline-template";
import CardCommentTemplate from "../components/molecules/card-comment-template";
import ButtonTemplate from "../components/atoms/button-template";
import ModalErrorTemplate from "../components/molecules/modal-error-template";
import ModalSuccessTemplate from "../components/molecules/modal-success-template";

// import icons
import FavoriteIcon from "@mui/icons-material/Favorite";

const DetailRecipe = () => {
  document.title = "Detail Recipe";
  const theme = useTheme();
  const getRecipeData = useSelector(
    (state) => state?.recipe?.recipeData?.data?.[0]
  );

  const getUserData = useSelector((state) => state.auth?.profile?.data);

  const isXs = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(min-width: 601px) and (max-width: 930px)");

  const [mode, setMode] = React.useState(localStorage.getItem("selectedTheme"));
  const [isModalErrOpen, setIsModalErrOpen] = React.useState(false);

  const [isModalSuccessOpen, setIsModalSuccessOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");

  const [getComments, setGetComments] = React.useState([]);
  const [getCommentValue, setGetCommentValue] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);

  const fetchComment = async () => {
    try {
      const getComment = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/recipes/search/comment/${
          getRecipeData?.recipes_id
        }`
      );

      const sortedComments = getComment?.data?.data.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      });

      setGetComments(sortedComments);
    } catch (error) {
      console.log("fetchComment", error);
    }
  };

  const handleAddComment = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/recipes/add/comments`,
        {
          accounts_id: getUserData?.accounts_id,
          recipes_id: getRecipeData?.recipes_id,
          comment: getCommentValue,
        },
        {
          headers: {
            Authorization: `Bearer ${getUserData?.accessToken}`,
          },
        }
      );
      console.log(response);
      fetchComment();
      setIsLoading(false);

      setSuccessMsg("Comment successfully added");
      handleSuccessModal();
    } catch (error) {
      if (error?.response?.status === 401) {
        handleRefreshToken();
      } else {
        console.log("ERRORhandleAddComment", error);
        setIsLoading(false);
      }
    }
  };

  const handleRefreshToken = async () => {
    try {
      const refreshTokenResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/token`,
        {
          withCredentials: true, // Include HTTTP ONLY cookies in the request
        }
      );
      const newAccessToken = refreshTokenResponse?.data?.accessToken;

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/recipes/add/comments`,
        {
          accounts_id: getUserData?.accounts_id,
          recipes_id: getRecipeData?.recipes_id,
          comment: getCommentValue,
        },
        {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        }
      );
      console.log(response);
      fetchComment();
      setIsLoading(false);

      setSuccessMsg("Comment successfully added");
      handleSuccessModal();
    } catch (error) {
      console.log("ERRORgetRefreshToken", error);
      setIsLoading(false);
    }
  };

  const handleErrModal = () => {
    setIsModalErrOpen(true);
  };

  const handleSuccessModal = () => {
    setIsModalSuccessOpen(true);
  };

  React.useEffect(() => {
    fetchComment();
  }, []);

  React.useEffect(() => {
    if (getCommentValue) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [getCommentValue]);

  return (
    <>
      <Navbar _setTheme={mode} getTheme={(e) => setMode(e)} />
      <Boxs
        _setTheme={mode}
        _sx={{
          marginTop: { md: "15vh", sm: "15vh", xs: "10vh" },
          // height: "300vh",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "500",
              fontSize: { xs: "30px", sm: "40px", md: "40px" },
            }}>
            {getRecipeData?.title}
          </Typography>

          <img
            src={`${import.meta.env.VITE_CLOUDINARY_URL}${
              getRecipeData?.photo
            }`}
            alt=""
            style={{
              width: isXs ? "100%" : isSm ? "50vw" : "50vw",
              marginTop: isXs ? "5vh" : "8vh",
              borderRadius: "10px",
              marginBottom: isXs ? "5vh" : "10vh",
            }}
          />
          {/* <div
            style={{
              position: "absolute",

              top: "100%",
              right: "26%",
              // marginRight: "10px",
              // marginBottom: "10px",
            }}>
            <FavoriteIcon
              fontSize="large"
              sx={{
                color: "gray",
                "&:hover": {
                  color: "red",
                  cursor: "pointer",
                },
              }}
            />
          </div> */}
        </div>
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{ fontSize: { xs: "30px", sm: "35px", md: "35px" } }}>
          Ingredients
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          component="ul"
          sx={{
            marginTop: isXs ? "1.5rem" : isSm ? "2.5rem" : "2.5rem",
            "& li": {
              marginTop: isXs ? "1.5rem" : isSm ? "2.5rem" : "2.5rem",
            },
          }}>
          {getRecipeData &&
            getRecipeData?.ingredients
              .split("--")
              .slice(1)
              .map((ingredient, i) => <li key={i}>{ingredient}</li>)}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <MultilineTemplate
            label="Comments : "
            onChange={(e) => {
              if (e.target.value === "") {
                setIsError(false);
                setGetCommentValue("");
              } else {
                if (e.target.value.length < 5) {
                  if (e.target.value.length === 0) {
                    setIsError(false);
                  } else {
                    setIsError(true);
                    setGetCommentValue("");
                  }
                } else {
                  setIsError(false);
                  setGetCommentValue(e.target.value);
                }
              }
            }}
            InputProps={{
              inputProps: {
                maxLength: 40,
              },
            }}
            error={isError}
            helperText={isError ? "Comment cannot be less than 5" : null}
            sx={{
              marginTop: { md: "10vh", sm: "10vh", xs: "5vh" },
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ButtonTemplate
            text="Send Comment"
            disabled={isDisabled}
            isLoading={isLoading}
            onClick={() => {
              if (!getUserData) {
                handleErrModal();
              } else {
                handleAddComment();
              }
            }}
            sx={{
              width: { md: "25%", sm: "25%", xs: "50%" },
              marginBottom: { md: "10vh", sm: "10vh", xs: "5vh" },
            }}
          />
        </div>
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{ fontSize: { xs: "30px", sm: "35px", md: "35px" } }}>
          Comments ({getComments.length})
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{
            fontSize: { xs: "30px", sm: "35px", md: "35px" },
            marginTop: { md: "10vh", sm: "10vh", xs: "5vh" },
            marginBottom: { md: "5vh", sm: "5vh", xs: "5vh" },
          }}></Typography>
        <CardCommentTemplate
          result={getComments}
          getId={getUserData?.accounts_id}
          _onSuccess={(e) => {
            if (e === true) {
              fetchComment();
              setSuccessMsg("Comment successfully edited");
              handleSuccessModal();
            }
          }}
          _onSuccessDelete={(e) => {
            if (e === true) {
              fetchComment();
              setSuccessMsg("Comment successfully deleted");
              handleSuccessModal();
            }
          }}
        />
        <ModalErrorTemplate
          open={isModalErrOpen}
          text="Please Login first before accessing this page"
          onClose={() => setIsModalErrOpen(false)}
        />
        <ModalSuccessTemplate
          open={isModalSuccessOpen}
          onClose={() => setIsModalSuccessOpen(false)}
          text={successMsg}
        />
      </Boxs>
    </>
  );
};

export default DetailRecipe;
