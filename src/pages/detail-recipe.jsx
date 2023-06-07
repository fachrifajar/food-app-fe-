import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as authReducer from "../store/reducer/auth";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getRecipeData = useSelector(
    (state) => state?.recipe?.recipeData?.data?.[0]
  );

  const getUserData = useSelector((state) => state.auth?.profile?.data);

  // console.log(getRecipeData);
  // console.log(getUserData);

  const isXs = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(min-width: 601px) and (max-width: 930px)");

  const [mode, setMode] = React.useState(
    localStorage.getItem("selectedTheme") || "dark"
  );
  const [isModalErrOpen, setIsModalErrOpen] = React.useState(false);
  const [isModalExp, setIsModalExp] = React.useState(false);

  const [isModalSuccessOpen, setIsModalSuccessOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");

  const [getComments, setGetComments] = React.useState([]);
  const [getCommentValue, setGetCommentValue] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);

  const [isFavoriteClicked, setIsFavoriteClicked] = React.useState(false);
  const [getLoveCount, setGetLoveCount] = React.useState(getRecipeData?.love);

  const handleFavoriteClick = () => {
    setIsFavoriteClicked(!isFavoriteClicked);
    handleLoveRecipe();
  };

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

  const fetchValidateLove = async (id) => {
    try {
      let accessToken = getUserData?.accessToken;

      try {
        const getValidate = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/users/recipes/love-recipe/validate/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setIsFavoriteClicked(getValidate?.data?.data);

        const getCount = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/users/recipes/love-recipe/count/${id}`
        );

        setGetLoveCount(getCount?.data?.data);
      } catch (error) {
        if (error?.response?.status === 401) {
          const refreshTokenResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/auth/token`,
            {
              withCredentials: true, // Include HTTP-only cookies in the request
            }
          );
          const newAccessToken = refreshTokenResponse?.data?.accessToken;

          accessToken = newAccessToken;

          const getValidate = await axios.get(
            `${
              import.meta.env.VITE_BASE_URL
            }/users/recipes/love-recipe/validate/${id}`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );

          setIsFavoriteClicked(getValidate?.data?.data);

          const getCount = await axios.get(
            `${
              import.meta.env.VITE_BASE_URL
            }/users/recipes/love-recipe/count/${id}`
          );

          setGetLoveCount(getCount?.data?.data);
        } else {
          console.log("ERR-fetchValidateLove", error);
        }
      }
    } catch (error) {
      console.log("ERR-fetchValidateLove", error);

      if (error?.response?.data?.message === "Invalid refresh token") {
        handleExpModal();
      }
    }
  };

  const fetchCountLove = async (id) => {
    try {
      const getCount = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/recipes/love-recipe/count/${id}`
      );

      setGetLoveCount(getCount?.data?.data);
    } catch (error) {
      console.log("ERR-fetchCountLove", error);
    }
  };

  const handleLoveRecipe = async () => {
    try {
      let accessToken = getUserData?.accessToken;

      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/users/recipes/add/like`,
          {
            recipes_id: getRecipeData?.recipes_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response);
        fetchCountLove(getRecipeData?.recipes_id);
      } catch (error) {
        if (error?.response?.status === 401) {
          const refreshTokenResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/auth/token`,
            {
              withCredentials: true, // Include HTTP-only cookies in the request
            }
          );

          // const refreshTokenResponse = await fetch(
          //   `${import.meta.env.VITE_BASE_URL}/auth/token`,
          //   {
          //     method: 'GET',
          //     credentials: 'include',
          //   }
          // );

          const newAccessToken = refreshTokenResponse?.data?.accessToken;

          accessToken = newAccessToken;

          const response = await axios.patch(
            `${import.meta.env.VITE_BASE_URL}/users/recipes/add/like`,
            {
              recipes_id: getRecipeData?.recipes_id,
            },
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          console.log(response);
          fetchCountLove(getRecipeData?.recipes_id);
        } else {
          console.log("ERR-handleLoveRecipe", error);
        }
      }
    } catch (error) {
      console.log("ERR-handleLoveRecipe", error);

      if (error?.response?.data?.message === "Invalid refresh token") {
        handleExpModal();
      }
    }
  };

  const handleAddComment = async () => {
    try {
      setIsLoading(true);

      let accessToken = getUserData?.accessToken;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/recipes/add/comments`,
          {
            accounts_id: getUserData?.accounts_id,
            recipes_id: getRecipeData?.recipes_id,
            comment: getCommentValue,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response);
        fetchComment();

        setSuccessMsg("Comment successfully added");
        handleSuccessModal();
      } catch (error) {
        if (error?.response?.status === 401) {
          const refreshTokenResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/auth/token`,
            {
              withCredentials: true, // Include HTTP-only cookies in the request
            }
          );
          const newAccessToken = refreshTokenResponse?.data?.accessToken;

          accessToken = newAccessToken;

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

          setSuccessMsg("Comment successfully added");
          handleSuccessModal();
        } else {
          console.log("ERRORhandleAddComment", error);
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.log("ERRORhandleAddComment", error);
      setIsLoading(false);
    }
  };

  const handleErrModal = () => {
    setIsModalErrOpen(true);
  };

  const handleSuccessModal = () => {
    setIsModalSuccessOpen(true);
  };

  const handleExpModal = () => {
    setIsModalExp(true);
  };

  React.useEffect(() => {
    fetchComment();

    fetchValidateLove(getRecipeData?.recipes_id);
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
              marginBottom: isXs ? "5vh" : "5vh",
            }}
          />
          <Typography
            component="div"
            sx={{
              width: isXs ? "100%" : isSm ? "50vw" : "50vw",
              display: "flex",
              marginBottom: isXs ? "5vh" : "10vh",
              marginTop: "-30px",
              // bgcolor: "custom.default2",
              alignItems: "center",
              borderRadius: "20px",
            }}>
            <FavoriteIcon
              fontSize="large"
              sx={{
                color: isFavoriteClicked ? "red" : "gray",
                cursor: "pointer",
                marginLeft: "auto",
              }}
              onClick={() => {
                handleFavoriteClick();
              }}
            />
            <Typography
              component="span"
              sx={{ marginLeft: "1%" }}
              color="text.secondary">
              {getLoveCount} Like
            </Typography>
          </Typography>
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
              if (e?.target?.value === "") {
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
          }}
        />
        {getComments?.length ? (
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
        ) : (
          <Typography
            component="div"
            align="center"
            sx={{
              fontSize: { xs: "20px", sm: "25px", md: "25px" },
              marginBottom: "10%",
            }}>
            No Comments Available
          </Typography>
        )}

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
        <ModalErrorTemplate
          open={isModalExp}
          text="Your session has expired. please Login"
          onClose={() => setIsModalExp(false)}>
          <ButtonTemplate
            text="Login"
            onClick={() => {
              dispatch(authReducer.deleteAuthData());
              navigate("/login");
            }}
          />
        </ModalErrorTemplate>
      </Boxs>
    </>
  );
};

export default DetailRecipe;

// const handleLoveRecipe = async () => {
//   try {
//     const refreshTokenResponse = await axios.get(
//       `${import.meta.env.VITE_BASE_URL}/auth/token`,
//       {
//         withCredentials: true, // Include HTTTP ONLY cookies in the request
//       }
//     );
//     const newAccessToken = refreshTokenResponse?.data?.accessToken;

//     const response = await axios.patch(
//       `${import.meta.env.VITE_BASE_URL}/users/recipes/add/like`,
//       {
//         recipes_id: getRecipeData?.recipes_id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${newAccessToken}`,
//         },
//       }
//     );
//     console.log("refreshTokenResponse", refreshTokenResponse);
//     fetchCountLove(getRecipeData?.recipes_id);
//   } catch (error) {
//     console.log("ERR-handleLoveRecipe", error);

//     if (error?.response?.data?.message === "Invalid refresh token") {
//       handleExpModal();
//     }
//   }
// };

// const handleAddComment = async () => {
//   try {
//     setIsLoading(true);

//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/users/recipes/add/comments`,
//       {
//         accounts_id: getUserData?.accounts_id,
//         recipes_id: getRecipeData?.recipes_id,
//         comment: getCommentValue,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${getUserData?.accessToken}`,
//         },
//       }
//     );
//     console.log(response);
//     fetchComment();
//     setIsLoading(false);

//     setSuccessMsg("Comment successfully added");
//     handleSuccessModal();
//   } catch (error) {
//     if (error?.response?.status === 401) {
//       handleRefreshToken();
//     } else {
//       console.log("ERRORhandleAddComment", error);
//       setIsLoading(false);
//     }
//   }
// };

// const handleRefreshToken = async () => {
//   try {
//     const refreshTokenResponse = await axios.get(
//       `${import.meta.env.VITE_BASE_URL}/auth/token`,
//       {
//         withCredentials: true, // Include HTTTP ONLY cookies in the request
//       }
//     );
//     const newAccessToken = refreshTokenResponse?.data?.accessToken;

//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/users/recipes/add/comments`,
//       {
//         accounts_id: getUserData?.accounts_id,
//         recipes_id: getRecipeData?.recipes_id,
//         comment: getCommentValue,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${newAccessToken}`,
//         },
//       }
//     );
//     console.log('refreshTokenResponse',refreshTokenResponse);
//     fetchComment();
//     setIsLoading(false);

//     setSuccessMsg("Comment successfully added");
//     handleSuccessModal();
//   } catch (error) {
//     console.log("ERRORgetRefreshToken", error);
//     setIsLoading(false);

//     if (error?.response?.data?.message === "Refresh token not provided") {
//       handleExpModal();
//     }
//   }
// };
