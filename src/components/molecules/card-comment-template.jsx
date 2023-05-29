import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { useMediaQuery, Typography, Avatar, IconButton } from "@mui/material";

import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CardCommentTemplate({ onClick, result }) {
  const isXs = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(min-width: 601px) and (max-width: 930px)");
  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: { md: "50vh", sm: "50vh", xs: "50vh" },
        overflow: "auto",
      }}>
      <Stack spacing={2}>
        {result &&
          result.map((item, index) => {
            const date = new Date(item?.updated_at);
            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedDate = new Intl.DateTimeFormat(
              "id-ID",
              options
            ).format(date);

            return (
              <Item
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}>
                {item?.profile_picture ===
                "https://res.cloudinary.com/daouvimjz/image/upload/v1673847179/blank-profile-picture-973460_tjapi1.png" ? (
                  <Avatar
                    sx={{
                      width: isXs ? "50px" : "70px",
                      height: isXs ? "50px" : "70px",
                      marginRight: isXs ? "15px" : isSm ? "40px" : "40px",
                      fontSize: isXs ? "25px" : "35px",
                    }}>
                    {item?.username[0]}
                  </Avatar>
                ) : (
                  <img
                    src={`${import.meta.env.VITE_CLOUDINARY_URL}${
                      item?.profile_picture
                    }`}
                    alt="comments-user-img"
                    style={{
                      width: isXs ? "50px" : "70px",
                      height: isXs ? "50px" : "70px",
                      borderRadius: "100%",
                      marginRight: isXs ? "15px" : isSm ? "40px" : "40px",
                    }}
                  />
                )}

                <div style={{ flex: 1 }}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      fontSize: { xs: "20px", sm: "25px", md: "25px" },
                      marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                    }}>
                    {item?.username}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: { xs: "20px", sm: "25px", md: "25px" } }}>
                    {item?.comment}
                  </Typography>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: {
                        xs: "15px",
                        sm: "15px",
                        md: "15px",
                        marginRight: "15px",
                      },
                      fontStyle: "italic"
                    }}>
                    {formattedDate}
                  </Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <IconButton
                    color="custom.default"
                    onClick={() => {
                      // Handle edit click
                    }}>
                    <ModeEditOutlineIcon />
                  </IconButton>
                  <IconButton
                    color="custom.default"
                    onClick={() => {
                      // Handle delete click
                    }}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Item>
            );
          })}
      </Stack>
    </Box>
  );
}
