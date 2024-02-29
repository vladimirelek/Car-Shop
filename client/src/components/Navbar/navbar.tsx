import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Outlet } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import "./navbar-style.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { currentUser, deleteUser } from "../../features/Auth/authSlice";
import { useCallback, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { lime } from "@mui/material/colors";
import { Badge } from "@mui/material";
const drawerWidth = 240;
const theme = createTheme({
  palette: {
    primary: lime,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "black", // Postavite crnu boju ovdje
        },
      },
    },
  },
});

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavBar() {
  const selector = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const initApp = useCallback(async () => {
    try {
      await dispatch(currentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const Logout = () => {
    dispatch(deleteUser());
  };
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="inherit">
          <Toolbar className="navbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <h2
              className="naslov"
              onClick={() => {
                navigate("/");
              }}
            >
              BEETLE STORE
            </h2>
            {selector.user ? (
              <div className="logout">
                <h2
                  className="email"
                  onClick={() => {
                    navigate(`/user/${selector.user?.id}`);
                  }}
                >
                  {selector.user.email}
                </h2>
                <LogoutIcon className="icon" color="inherit" onClick={Logout} />
              </div>
            ) : (
              <div className="auth">
                <Link className="tekst" to="/login">
                  LOGIN
                </Link>
                <Link className="tekst" to="/register">
                  REGISTER
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            {["Home", "Shop", "Inbox"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    if (index === 0) {
                      navigate("/");
                    } else if (index === 1) {
                      navigate("/shop");
                    } else {
                      if (selector.user) {
                        navigate("/inbox");
                      } else {
                        toast.warning("You do not have permision to do that");
                      }
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 && (
                      <HomeSharpIcon
                        onClick={() => {
                          navigate("/");
                        }}
                      />
                    )}
                    {index === 1 && (
                      <DirectionsCarIcon
                        onClick={() => {
                          navigate("/shop");
                        }}
                      />
                    )}
                    {index === 2 && (
                      <Badge
                        badgeContent={
                          selector.user?.roles.includes("Admin")
                            ? 0
                            : selector.user?.messages.length
                        }
                        color="primary"
                      >
                        <MailIcon
                          color="action"
                          onClick={() => {
                            selector.user
                              ? navigate("/inbox")
                              : toast.warn(
                                  "You dont have permision to do that"
                                );
                          }}
                        />
                      </Badge>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
      <Outlet />
    </>
  );
}
