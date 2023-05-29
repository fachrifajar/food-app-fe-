import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CardTemplate({ image,title, onClick }) {
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
            color="text.secondary">
            {title}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
