import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as authReducer from "../store/reducer/auth";

import { Typography, Box, Button, useMediaQuery } from "@mui/material";
import Boxs from "../components/atoms/box-template";
import Navbar from "../components/organisms/navbar";
import TextFieldTemplate from "../components/atoms/textField-template";
import MultilineTemplate from "../components/atoms/multiline-template";
import ButtonTemplate from "../components/atoms/button-template";
import ModalSuccessTemplate from "../components/molecules/modal-success-template";
import ModalErrorTemplate from "../components/molecules/modal-error-template";

import {
  INITIAL_STATE,
  addRecipeReducer,
} from "../hook/register/addRecipeReducer";

const AddRecipe = () => {
  document.title = "Add Recipe";

  const navigate = useNavigate();
  const isXs = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(min-width: 601px) and (max-width: 930px)");

  const [mode, setMode] = React.useState(localStorage.getItem("selectedTheme"));
  const [authData, setAuthData] = React.useState(
    useSelector((state) => state.auth?.profile?.data)
  );

  const [state, dispatch] = React.useReducer(addRecipeReducer, INITIAL_STATE);

  const handleChangeTitle = (e) => {
    const newValue = e.target.value;

    if (newValue.length < 5) {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "title",
          value: {
            value: "",
            isErr: true,
            errMsg: "Title cannot be less than 5 characters",
          },
        },
      });
    } else {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "title",
          value: {
            value: newValue,
            isErr: false,
            errMsg: "",
          },
        },
      });
    }
  };

  const handleChangeIngredients = (e) => {
    const newValue = e.target.value;

    if (newValue === "") {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "title",
          value: {
            value: "",
            isErr: false,
            errMsg: "",
          },
        },
      });
    } else {
      if (newValue.length < 10) {
        if (newValue.length == 0) {
          dispatch({
            type: "CHANGE_INPUT",
            payload: {
              name: "ingredients",
              value: {
                value: "",
                isErr: false,
                errMsg: "",
              },
            },
          });
        } else {
          dispatch({
            type: "CHANGE_INPUT",
            payload: {
              name: "ingredients",
              value: {
                value: "",
                isErr: true,
                errMsg: "Ingredients cannot less than 10 characters",
              },
            },
          });
        }
      } else {
        const lines = newValue.split("\n");

        const containsDoubleDash = lines.some((line) => line.includes("--"));

        const hasEmptyLine = lines.some((line, index) => {
          return line.trim() === "" && lines[index + 1]?.trim() !== "";
        });

        if (containsDoubleDash && !hasEmptyLine) {
          dispatch({
            type: "CHANGE_INPUT",
            payload: {
              name: "ingredients",
              value: {
                value: "",
                isErr: true,
                errMsg: "Ingredients cannot contain double dashes",
              },
            },
          });
        } else if (!containsDoubleDash && hasEmptyLine) {
          dispatch({
            type: "CHANGE_INPUT",
            payload: {
              name: "ingredients",
              value: {
                value: "",
                isErr: true,
                errMsg: "Each new line cannot contain empty value",
              },
            },
          });
        } else {
          const formattedIngredients = lines.map((line) => `--${line}`);
          const formattedValue = formattedIngredients.join("\n");

          dispatch({
            type: "CHANGE_INPUT",
            payload: {
              name: "ingredients",
              value: {
                value: formattedValue,
                isErr: false,
                errMsg: "",
              },
            },
          });
        }
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name: "photo",
        value: {
          value: file,
        },
      },
    });

    const reader = new FileReader();
    reader.onload = () => {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          name: "previewPhoto",
          value: {
            value: reader.result,
          },
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    dispatch({ type: "REMOVE_IMAGE" });
  };

  const handleSubmit = async () => {
    try {
      dispatch({ type: "FETCH_START" });

      const refreshTokenResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/token`,
        {
          withCredentials: true,
        }
      );
      const newAccessToken = refreshTokenResponse?.data?.accessToken;

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/recipes/add`,
        {
          ingredients: state?.ingredients?.value,
          photo: state?.photo?.value,
          title: state?.title?.value,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${newAccessToken}`,
          },
        }
      );
      console.log(response);

      dispatch({ type: "FETCH_SUCCESS" });
    } catch (error) {
      console.error("errorhandleSubmit", error);
      if (error?.code == "ERR_NETWORK") {
        dispatch({ type: "FORCE_STOP" });
      } else if (error?.response?.status === 403) {
        dispatch({
          type: "FETCH_ERROR",
          payload: { errMsg: error?.response?.data?.message },
        });
      } else if (error?.response?.data?.message?.code === 413) {
        dispatch({
          type: "FETCH_ERROR",
          payload: { errMsg: error?.response?.data?.message?.message },
        });
      }
    }
  };

  React.useEffect(() => {
    if (!authData) {
      navigate("/login");
    }

    if (state.title.value && state.ingredients.value && state.photo.value) {
      dispatch({ type: "HANDLE_UNDISABLED" });
    } else {
      dispatch({ type: "HANDLE_DISABLED" });
    }
  }, [state.title.value, state.ingredients.value, state.photo.value]);

  return (
    <>
      <Navbar _setTheme={mode} getTheme={(e) => setMode(e)} />
      <Boxs _setTheme={mode} _sx={{ marginBottom: "5%" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "500",
            marginTop: "5%",
            fontSize: { xs: "30px", sm: "40px", md: "40px" },
          }}>
          Add New Recipe
        </Typography>

        <Typography
          component="div"
          align="center"
          sx={{
            marginTop: "3%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <TextFieldTemplate
            label="Title"
            variant="filled"
            placeholder="Enter your recipe title"
            onChange={handleChangeTitle}
            error={state?.title?.isErr}
            helperText={state?.title?.errMsg}
            InputProps={{
              inputProps: {
                maxLength: 20,
              },
            }}
            sx={{
              width: { md: "50%", sm: "50%", xs: "85%" },
              marginBottom: { md: "2%", sm: "2%", xs: "5%" },
            }}
          />

          <MultilineTemplate
            label="Ingredients"
            placeholder="Enter each ingredient on a new line"
            onChange={handleChangeIngredients}
            error={state?.ingredients?.isErr}
            helperText={state?.ingredients?.errMsg}
            sx={{
              width: { md: "50%", sm: "50%", xs: "85%" },
              marginBottom: { md: "2%", sm: "2%", xs: "5%" },
            }}
          />

          <Box textAlign="center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                variant="contained"
                component="span"
                color="secondary"
                sx={{ marginBottom: "3%" }}>
                Change Image
              </Button>
            </label>
            {state?.photo?.value && (
              <Typography
                component="div"
                color="text.secondary"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1%",
                  border: "1px dashed",
                  padding: "10px",
                }}>
                <img
                  src={state?.previewPhoto?.value}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: isXs ? "70vw" : isSm ? "630px" : "630px",
                    maxHeight: isXs ? "70vh" : isSm ? "630px" : "630px",
                    objectFit: "contain",
                  }}
                />
                <ButtonTemplate
                  onClick={handleRemoveImage}
                  text="Remove"
                  color="error"
                  sx={{
                    width: { md: "11%", sm: "11%", xs: "32%" },
                    borderRadius: "5px",
                  }}
                />
              </Typography>
            )}
          </Box>
        </Typography>
        <Box textAlign="center">
          <ButtonTemplate
            disabled={state?.isDisabled}
            isLoading={state?.isLoading}
            onClick={handleSubmit}
            text="submit change"
            sx={{
              width: { md: "30%", sm: "30%", xs: "70%" },
              borderRadius: "10px",
            }}
          />
        </Box>
        <ModalSuccessTemplate
          text="Success Add New Recipes"
          open={state?.isModalSuccessOpen}>
          <ButtonTemplate
            text="Click here to continue"
            onClick={() => {
              navigate("/profile");
            }}></ButtonTemplate>
        </ModalSuccessTemplate>
        <ModalErrorTemplate
          open={state?.isModalErrOpen}
          onClose={() => dispatch({ type: "CLOSE_MODAL_ERR" })}
          text={state?.errMsgApi?.errMsg}
        />
      </Boxs>
    </>
  );
};

export default AddRecipe;
