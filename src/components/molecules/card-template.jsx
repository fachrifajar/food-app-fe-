import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CardTemplate({ image, title, onClick, children }) {
  return (
    <Card
      sx={
        {
          // maxWidth: 345,
          // width: { md: "25vw", sm: "25vw", xs: "40vw" },
          //  zIndex: 1,
          //  position: "absolute"
        }
      }>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="400"
          image={image}
          alt="card-img"
          sx={{ objectFit: "cover" }}
        />
        <CardContent
        //  sx={{ padding: 0 }}
        >
          <Typography
            noWrap
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
            color="text.secondary"
            sx={{ fontSize: { xs: "20px", sm: "24px", md: "24px" } }}
            >
            {title}
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
