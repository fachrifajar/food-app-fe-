import * as React from "react";

import {
  useMediaQuery,
  Typography,
  Avatar,
  IconButton,
  styled,
  Box,
  Paper,
  Stack,
} from "@mui/material";

// import icons
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";

// import components
import ModalEditComment from "./modal-edit-comment";
import ModalDelete from "./modal-delete";
import ModalSuccessTemplate from "./modal-success-template";
import ButtonTemplate from "../atoms/button-template";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
  padding: "1% 2%",
}));

export default function CardCommentTemplate({
  onClick,
  result,
  getId,
  _onSuccess,
  _onSuccessDelete,
}) {
  const isXs = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(min-width: 601px) and (max-width: 930px)");

  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const [getCommentsId, setGetCommentsId] = React.useState("");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = React.useState(false);

  const [modalSuccess, setModalSuccess] = React.useState(false);
  const [getRecipeName, setGetRecipeName] = React.useState("");

  const handleSuccessModal = () => {
    setIsModalEditOpen(true);
  };

  const handleSuccessModalDelete = () => {
    setIsModalDeleteOpen(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: { md: "50vh", sm: "50vh", xs: "50vh" },
        overflow: "auto",
        marginBottom: "50vh",
      }}>
      <Stack spacing={2}>
        {result &&
          result.map((item, index) => {
            const date = new Date(item?.created_at);
            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedDate = new Intl.DateTimeFormat(
              "id-ID",
              options
            ).format(date);

            const dateUpdatedAt = new Date(item?.updated_at);
            const optionsUpdatedAt = {
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const formattedDateUpdatedAt = new Intl.DateTimeFormat(
              "id-ID",
              optionsUpdatedAt
            ).format(dateUpdatedAt);

            return (
              <Item
                key={index}
                onClick={() => {
                  setGetCommentsId(item?.comments_id);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
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
                      objectFit: "cover",
                    }}
                  />
                )}

                <div style={{ flex: 1, maxWidth: "100%" }}>
                  <Typography
                    fontWeight="bold"
                    sx={{
                      fontSize: { xs: "20px", sm: "25px", md: "25px" },
                      marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                    }}>
                    {item?.username}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "20px", sm: "20px", md: "20px" },
                      maxWidth: "50%",
                      wordWrap: "break-word",
                      marginBottom: { xs: "15px", sm: "20px", md: "20px" },
                    }}>
                    {item?.comment}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "15px",
                        sm: "15px",
                        md: "15px",
                        fontStyle: "italic",
                      },
                    }}>
                    {formattedDate}{" "}
                    {item?.created_at !== item?.updated_at ? (
                      <span>
                        {" "}
                        - [Edited comment : {formattedDateUpdatedAt}]
                      </span>
                    ) : null}
                  </Typography>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {getId && item?.accounts_id == getId && (
                    <>
                      <IconButton
                        color="custom.default"
                        onClick={() => {
                          handleSuccessModal();
                        }}
                        sx={{ cursor: "pointer" }}>
                        <ModeEditOutlineIcon />
                      </IconButton>
                      <IconButton
                        color="custom.default"
                        onClick={() => {
                          handleSuccessModalDelete();
                          setGetRecipeName(item?.title);
                        }}
                        sx={{ cursor: "pointer" }}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </div>
              </Item>
            );
          })}
      </Stack>
      <ModalEditComment
        open={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        _getCommentsId={getCommentsId}
        onSuccess={(e) => _onSuccess(e)}
      />
      <ModalDelete
        title={"Are you sure you want to delete this comment?"}
        open={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        _getDeleteId={getCommentsId}
        onSuccess={(e) => _onSuccessDelete(e)}
        urlParams="comments"
      />
      <ModalSuccessTemplate
        open={modalSuccess}
        // onClose={() => setModalSuccess(false)}
        text={`Success delete Recipe: ${getRecipeName}`}>
        <ButtonTemplate
          text="Click here to continue"
          onClick={() => {
            setModalSuccess(false);
            onClose(true);
          }}></ButtonTemplate>
      </ModalSuccessTemplate>
    </Box>
  );
}
