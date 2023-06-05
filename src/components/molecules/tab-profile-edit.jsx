import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as authReducer from "../../store/reducer/auth";

import { Typography, Box, Button } from "@mui/material";
import TextFieldTemplate from "../../components/atoms/textField-template";
import ButtonTemplate from "../atoms/button-template";
import ModalErrorTemplate from "./modal-error-template";
import ModalSuccessTemplate from "./modal-success-template";

const TabProfileEdit = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const [getUserData, setGetUserData] = React.useState(
    useSelector((state) => state.auth?.profile?.data)
  );

  const [name, setName] = React.useState({
    value: "",
    isErr: false,
    errMsg: "",
  });
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [previewImage, setPreviewImage] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const [modalSuccess, setModalSuccess] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");

  const [modalErr, setModalErr] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  React.useEffect(() => {
    if (name?.value || selectedImage) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name?.value, selectedImage]);

  const handleChangeName = (event) => {
    const newName = event.target.value;
    const strRegex = /^(?!(?:.*\s){3})[A-Za-z][A-Za-z\s\d]{5,25}$/;

    if (!strRegex.test(newName)) {
      setName({
        ...name,
        value: "",
        isErr: true,
        errMsg:
          "Name must contain only letters & numbers and letters. Start with a letter and be between 5-20 characters long",
      });
    } else {
      setName({ ...name, value: newName, isErr: false, errMsg: "" });
    }
  };

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

      if (name?.value || selectedImage) {
        const response = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/users/edit/${
            getUserData?.accounts_id
          }`,
          {
            username: name?.value == "" ? null : name?.value,
            profile_picture: selectedImage,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );

        const validateUsername = response?.data?.data?.username;
        const validateProfilePicture = response?.data?.data?.profile_picture;

        if (validateUsername || validateProfilePicture) {
          setSuccessMsg(
            `${validateUsername ? "Username" : ""}${
              validateUsername && validateProfilePicture ? " & " : ""
            }${
              validateProfilePicture ? "Profile Picture" : ""
            } successfully updated`
          );
          const redux = dispatch(
            authReducer.setAuthProfile({
              data: {
                ...getUserData,
                ...(validateUsername && { username: validateUsername }),
                ...(validateProfilePicture && {
                  profilePicture: validateProfilePicture,
                }),
              },
            })
          );
          onSuccess(redux?.payload?.data);
        }

        setIsLoading(false);
        setModalSuccess(true);
      }
    } catch (error) {
      // console.error(error);
      setIsLoading(false);
      setModalErr(true);
      setErrMsg(error?.response?.data?.message?.message);
    }
  };

  return (
    <>
      <Typography component="div" align="center">
        <TextFieldTemplate
          label="Username"
          placeholder="Change your username"
          onChange={handleChangeName}
          error={name?.isErr ? true : false}
          helperText={name?.isErr ? name?.errMsg : null}
          InputProps={{
            inputProps: {
              maxLength: 25,
            },
          }}
        />
      </Typography>

      <Box textAlign="center" sx={{ marginTop: "1%" }}>
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
              // border: "1px dashed",
              // padding: "10px",
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
              // variant="outlined"
              text="Remove"
              color="error"
              sx={{
                width: { md: "11%", sm: "11%", xs: "32%" },
                borderRadius: "5px",
                // color: "text.secondary",
              }}
            />
          </Typography>
        )}
        <Box textAlign="center">
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
        onClose={() => setModalSuccess(false)}
        text={successMsg}
      />
      <ModalErrorTemplate
        open={modalErr}
        onClose={() => setModalErr(false)}
        text={errMsg}
      />
    </>
  );
};

export default TabProfileEdit;
