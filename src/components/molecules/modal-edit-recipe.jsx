import React from "react";
import { Modal, Card, Typography, styled, Box, Button } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as authReducer from "../../store/reducer/auth";

import CloseIcon from "@mui/icons-material/Close";
import ButtonTemplate from "../atoms/button-template";
import TextFieldTemplate from "../atoms/textField-template";
import MultilineTemplate from "../atoms/multiline-template";
import ModalErrorTemplate from "./modal-error-template";
import ModalSuccessTemplate from "./modal-success-template";

const MyModal = styled(Modal)(({ theme, sx }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20%",
  [theme.breakpoints.up("md")]: {
    marginBottom: "5%",
  },
  ...sx,
}));

const MyCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  borderRadius: "20px",
  padding: "30px 50px",
  overflowY: "auto",
  width: "100vw",
  [theme.breakpoints.up("md")]: {
    width: "50vw",
  },
  maxHeight: "70vh",
}));

const ModalEditRecipe = ({ open, onClose, onSuccess, getRecipeData }) => {
  const [authData, setAuthData] = React.useState(
    useSelector((state) => state.auth?.profile?.data?.accessToken)
  );

  const [title, setTitle] = React.useState("");
  const [isErrTitle, setIsErrTitle] = React.useState(false);

  const [ingredients, setIngredients] = React.useState("");
  const [isErrIngredients, setIsErrIngredients] = React.useState(false);
  const [errMsgIngredients, setErrMsgIngredients] = React.useState("");

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const [modalSuccess, setModalSuccess] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");

  const [modalErr, setModalErr] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  const [isModalExp, setIsModalExp] = React.useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const refreshTokenResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/token`,
        {
          withCredentials: true, // Include HTTTP ONLY cookies in the request
        }
      );
      const newAccessToken = refreshTokenResponse?.data?.accessToken;

      if (title || selectedImage || ingredients) {
        console.log(title);
        console.log(ingredients);

        const response = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/users/recipes/edit/${
            getRecipeData?.recipes_id
          }`,
          {
            title: title == "" ? null : title,
            ingredients: ingredients == "" ? null : ingredients,
            photo: selectedImage,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );
        console.log(response);

        const validateTitle = response?.data?.data?.title;
        const validateIngredients = response?.data?.data?.ingredients;
        const validatePhoto = response?.data?.data?.photo;

        console.log(validateTitle);
        console.log(validateIngredients);
        console.log(validatePhoto);

        if (validateTitle && validateIngredients && validatePhoto) {
          setSuccessMsg("Title, Ingredients & Photo, successfully updated");
        } else if (validateTitle && validateIngredients) {
          setSuccessMsg("Title & Ingredients, successfully updated");
        } else if (validateTitle && validatePhoto) {
          setSuccessMsg("Title & Photo, successfully updated");
        } else if (validateIngredients && validatePhoto) {
          setSuccessMsg("Ingredients & Photo, successfully updated");
        } else if (validateTitle) {
          setSuccessMsg("Title, successfully updated");
        } else if (validateIngredients) {
          setSuccessMsg("Ingredients, successfully updated");
        } else if (validatePhoto) {
          setSuccessMsg("Photo, successfully updated");
        }

        setIsLoading(false);
        setModalSuccess(true);

        setTitle("");
        setIngredients("");
        setSelectedImage(null);

        onSuccess(true);
      }
    } catch (error) {
      console.error("errorhandleSubmit", error);
      setIsLoading(false);

      if (error?.response?.data?.message === "Invalid refresh token") {
        setIsModalExp(true);
      } else {
        setModalErr(true);
        setErrMsg(error?.response?.data?.message?.message);
      }
    }
  };

  React.useEffect(() => {
    if (ingredients || selectedImage || title) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [ingredients, selectedImage, title]);

  return (
    <>
      <MyModal open={open}>
        <MyCard>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}>
            <Typography
              variant="h5"
              color="text.secondary"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "20px", sm: "24px", md: "24px" },
              }}>
              Edit Recipe :{" "}
              <span style={{ fontStyle: "italic" }}>
                {getRecipeData?.title}
              </span>
            </Typography>
            <CloseIcon
              color="action"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  transition: "transform 0.3s ease",
                  transform: "rotate(90deg)",
                },
              }}
              onClick={onClose}
            />
          </div>
          <hr
            style={{
              border: "none",
              borderBottom: "1px solid #ccc",
              marginBottom: "20px",
              width: "100%",
            }}
          />
          <TextFieldTemplate
            label="Title"
            variant="filled"
            placeholder={getRecipeData?.title}
            onChange={(e) => {
              if (e.target.value.length < 5) {
                setIsErrTitle(true);
                setTitle("");
              } else {
                setIsErrTitle(false);
                setTitle(e.target.value);
              }
            }}
            InputProps={{
              inputProps: {
                maxLength: 20,
              },
            }}
            error={isErrTitle}
            helperText={
              isErrTitle ? "Title cannot be less than 5 characters" : null
            }
            sx={{ display: "flex", width: "100%" }}
          />

          <MultilineTemplate
            label="Ingredients: "
            placeholder="Enter each ingredient on a new line"
            onChange={(e) => {
              if (e.target.value === "") {
                setIsErrIngredients(false);
                setIngredients("");
              } else {
                if (e.target.value.length < 10) {
                  if (e.target.value.length === 0) {
                    setIsErrIngredients(false);
                  } else {
                    setIsErrIngredients(true);
                    setIngredients("");
                    setErrMsgIngredients(
                      "Ingredients cannot less than 10 characters"
                    );
                  }
                } else {
                  const lines = e.target.value.split("\n");

                  const containsDoubleDash = lines.some((line) =>
                    line.includes("--")
                  );

                  const hasEmptyLine = lines.some((line, index) => {
                    return (
                      line.trim() === "" && lines[index + 1]?.trim() !== ""
                    );
                  });

                  if (containsDoubleDash && !hasEmptyLine) {
                    setIsErrIngredients(true);
                    setIngredients("");
                    setErrMsgIngredients(
                      "Ingredients cannot contain double dashes"
                    );
                  } else if (!containsDoubleDash && hasEmptyLine) {
                    setIsErrIngredients(true);
                    setIngredients("");
                    setErrMsgIngredients(
                      "Each new line cannot contain empty value"
                    );
                  } else {
                    const formattedIngredients = lines.map(
                      (line) => `--${line}`
                    );

                    const formattedValue = formattedIngredients.join("\n");

                    setIsErrIngredients(false);
                    setIngredients(formattedValue);
                  }
                }
              }
            }}
            error={isErrIngredients}
            helperText={isErrIngredients ? errMsgIngredients : null}
            sx={{
              marginTop: "2%",
              width: "100%",
            }}
          />

          <Box
            textAlign="center"
            sx={{ marginTop: { md: "3%", sm: "3%", xs: "5%" } }}>
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
            {selectedImage && (
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
                  src={previewImage}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
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
            <Box textAlign="right">
              <ButtonTemplate
                disabled={isDisabled}
                isLoading={isLoading}
                onClick={handleSubmit}
                text="submit change"
                color="success"
                sx={{
                  width: { md: "30%", sm: "30%", xs: "70%" },
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Box>

          <ModalSuccessTemplate
            open={modalSuccess}
            // onClose={() => setModalSuccess(false)}
            text={successMsg}>
            <ButtonTemplate
              text="Click here to continue"
              onClick={() => {
                setModalSuccess(false);
                onClose(true);
              }}></ButtonTemplate>
          </ModalSuccessTemplate>
          <ModalErrorTemplate
            open={modalErr}
            onClose={() => setModalErr(false)}
            text={errMsg}
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
        </MyCard>
      </MyModal>
    </>
  );
};

export default ModalEditRecipe;
