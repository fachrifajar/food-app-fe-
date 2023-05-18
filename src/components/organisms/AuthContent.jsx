import React from "react";
import { Grid } from "@mui/material";

const AuthContent = ({ children }) => {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Grid container spacing={2} style={{ height: "100%" }}>
        <Grid item md={6} xs={12} style={{ position: "relative" }}>
          <img
            src="auth-photo-2.jpg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              //   margin: 0,
              //   padding: 0,
              //   position: "relative",
              //   bottom: 170,
                // transform: "scale(1)",
            }}
            alt="auth-photo"
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#EFC81A",
              opacity: 0.3,
            }}
          />
          <img
            src="main-logo.png"
            style={{
              width: "15%",
              objectFit: "cover",
              zIndex: 1,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -170%)",
            }}
            alt="auth-photo-2"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            overflowY: "auto",
            height: "100%",
            maxHeight: "100vh",
          }}>
          <div>{children}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthContent;
