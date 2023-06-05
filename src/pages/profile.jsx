import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  useMediaQuery,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CollectionsIcon from "@mui/icons-material/Collections";

import Navbar from "../components/organisms/navbar";
import Boxs from "../components/atoms/box-template";
import TabProfileEdit from "../components/molecules/tab-profile-edit";
import TabProfileCard from "../components/molecules/tab-profile-card";

const Profile = () => {
  document.title = "Profile";

  const isXs = useMediaQuery("(max-width: 900px)");
  const isSm = useMediaQuery("(min-width: 601px) and (max-width: 930px)");

  const [mode, setMode] = React.useState(localStorage.getItem("selectedTheme"));
  const [authData, setAuthData] = React.useState(
    useSelector((state) => state.auth?.profile?.data)
  );
  const [name, setName] = React.useState(authData?.username);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateData = (e) => {
    setAuthData(e);
    setName(e.username);
  };

  return (
    <>
      <Navbar _setTheme={mode} getTheme={(e) => setMode(e)} />
      <Boxs _setTheme={mode} _sx={{ height: "150vh" }}>
        <Typography component="div" align="center" sx={{ marginTop: "10%" }}>
          {authData?.profilePicture?.includes("http") ? (
            <Avatar
              sx={{
                height: { md: "120px", sm: "120px", xs: "100px" },
                width: { md: "120px", sm: "120px", xs: "100px" },
              }}>
              {authData?.username[0]}
            </Avatar>
          ) : (
            <>
              <img
                className="content-img"
                src={`${import.meta.env.VITE_CLOUDINARY_URL}${
                  authData?.profilePicture
                }`}
                alt="user-img"
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                  height: isXs ? "100px" : isSm ? "120px" : "120px",
                  width: isXs ? "100px" : isSm ? "120px" : "120px",
                  marginBottom: "1%",
                }}
              />
            </>
          )}
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ marginBottom: "1%", fontWeight: 500 }}>
            {name}
          </Typography>
        </Typography>

        {/* <Box
          sx={{
            width: "50%",
            bgcolor: "custom.default3",
            borderRadius: "10px",
            padding: "1% 3%",
          }}> */}
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          color="text.secondary">
          <Tab icon={<CollectionsIcon />} label="Recipes" />
          <Tab icon={<ManageAccountsIcon />} label="Edit" />
        </Tabs>

        {value === 1 ? <TabProfileEdit onSuccess={updateData} /> : null}
        {value === 0 ? <TabProfileCard /> : null}
        {/* </Box> */}
      </Boxs>
    </>
  );
};

export default Profile;
