import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ButtonTemplate from "../atoms/button-template";
import { useNavigate } from "react-router-dom";
import * as authReducer from "../../store/reducer/auth";
import ModalErrorTemplate from "../molecules/modal-error-template";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const pages = ["Home", "Add Recipe", "Profile"];
const settings = ["Logout"];

function Navbar({ _setTheme, getTheme }) {
  const setTheme = theme(_setTheme);
  const isXs = useMediaQuery("(max-width: 900px)");
  const isSm = useMediaQuery("(min-width: 601px) and (max-width: 930px)");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [authData, setAuthData] = React.useState(
    useSelector((state) => state.auth?.profile?.data)
  );
  const [mode, setMode] = React.useState("dark");
  const [isModalErrOpen, setIsModalErrOpen] = React.useState(false);

  const handleSwitchChange = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    getTheme(mode);
    localStorage.setItem("selectedTheme", mode);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleErrModal = () => {
    setIsModalErrOpen(true);
  };

  return (
    <ThemeProvider theme={setTheme}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ bgcolor: "custom.default" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              // href="/"
              onClick={() => window.location.reload()}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                color: "text.primary",
                // "&:hover": {
                //   color: "primary.main",
                //   transition: "all 0.5s ease",
                // },
              }}>
              Food
              <span
                style={{
                  color: "white",
                  backgroundColor: "#ff9000",
                  borderRadius: "5px",
                  paddingLeft: "5px",
                }}>
                Hub
              </span>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="text.contrastText">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}>
                <MenuItem
                  onClick={() => {
                    if (location.pathname === "/") {
                      window.location.reload();
                    } else {
                      navigate("/");
                    }
                    handleCloseNavMenu();
                  }}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (!authData) {
                      handleErrModal();
                    } else {
                      if (location.pathname === "/add-recipe") {
                        window.location.reload();
                      } else {
                        navigate("/add-recipe");
                      }
                    }
                    handleCloseNavMenu();
                  }}>
                  <Typography textAlign="center">Add Recipe</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (!authData) {
                      handleErrModal();
                    } else {
                      if (location.pathname === "/profile") {
                        window.location.reload();
                      } else {
                        navigate("/profile");
                      }
                    }
                    handleCloseNavMenu();
                  }}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">
                    <MaterialUISwitch onChange={handleSwitchChange} />
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              // href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                color: "text.primary",
              }}>
              Food
              <span
                style={{
                  color: "white",
                  backgroundColor: "#ff9000",
                  borderRadius: "5px",
                  paddingLeft: "5px",
                }}>
                Hub
              </span>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages?.map((page) => {
                let isActive = false;

                if (page === "Home" && location.pathname === "/") {
                  isActive = true;
                } else if (
                  page === "Add Recipe" &&
                  location.pathname === "/add-recipe"
                ) {
                  isActive = true;
                } else if (
                  page === "Profile" &&
                  location.pathname === "/profile"
                ) {
                  isActive = true;
                }

                return (
                  <Button
                    key={page}
                    onClick={() => {
                      if (!authData && page !== "Home") {
                        handleErrModal();
                      } else {
                        if (page === "Home") {
                          if (location.pathname === "/") {
                            window.location.reload();
                          } else {
                            navigate("/");
                          }
                        } else if (page === "Add Recipe") {
                          if (location.pathname === "/add-recipe") {
                            window.location.reload();
                          } else {
                            navigate("/add-recipe");
                          }
                        } else if (page === "Profile") {
                          if (location.pathname === "/profile") {
                            window.location.reload();
                          } else {
                            navigate("/profile");
                          }
                        }
                      }

                      handleCloseNavMenu();
                    }}
                    sx={{
                      my: 2,
                      color: isActive ? "text.secondary" : "text.primary",
                      display: "block",
                      "&:hover": {
                        color: "primary.main",
                        transition: "all 0.5s ease",
                        textDecoration: isActive ? "underline" : null,
                      },
                      textDecoration: isActive ? "underline" : null,
                      mx: 3,
                      fontWeight: isActive ? 1000 : null,
                    }}>
                    {page}
                  </Button>
                );
              })}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {!isXs && (
                <FormControlLabel
                  control={<MaterialUISwitch />}
                  onChange={handleSwitchChange}
                />
              )}

              <Tooltip title={!authData ? null : "Open settings"}>
                <IconButton
                  onClick={authData ? handleOpenUserMenu : null}
                  sx={{ p: 0 }}>
                  {authData ? (
                    authData?.profilePicture.includes("http") ? (
                      <Avatar>{authData?.username[0]}</Avatar>
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_CLOUDINARY_URL}${
                          authData?.profilePicture
                        }`}
                        alt="navbar-user-img"
                        style={{
                          borderRadius: "100%",
                          height: isXs ? "40px" : isSm ? "50px" : "50px",
                          width: isXs ? "40px" : isSm ? "50px" : "50px",
                        }}
                      />
                    )
                  ) : (
                    <ButtonTemplate
                      text="Login"
                      sx={{
                        marginTop: "0",
                        bgcolor: "text.contrastText",
                        "&:hover": {
                          bgcolor: "text.secondary",
                          color: mode !== "dark" ? "black" : "white",
                        },
                        width: { md: "3rem", sm: "3rem", xs: "1rem" },
                        fontSize: { md: "14px", sm: "14px", xs: "13px" },
                      }}
                      onClick={() => navigate("/login")}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        dispatch(authReducer.deleteAuthData());
                        window.location.reload();
                      }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
          <ModalErrorTemplate
            open={isModalErrOpen}
            text="Please Login first before accessing this page"
            onClose={() => setIsModalErrOpen(false)}
          />
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default Navbar;
