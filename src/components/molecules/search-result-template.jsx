import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { InputAdornment } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicStack({ result, onClick }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: { md: "300px", sm: "300px", xs: "150px" },
        overflow: "auto",
      }}>
      <Stack spacing={2}>
        {result &&
          result.map((item, index) => (
            <Item
              onClick={() => {
                onClick(item?.slug);
              }}
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <InputAdornment key={index} position="start">
                <SearchRoundedIcon />
              </InputAdornment>
              {item?.title}
            </Item>
          ))}
      </Stack>
    </Box>
  );
}
