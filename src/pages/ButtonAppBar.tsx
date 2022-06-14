import React, { useEffect, useState } from "react";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../logo.png";
import "./App.css";
import "./_navbar.css";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import LoginForm from "./LoginForm";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link, NavLink, Route, Switch, useLocation } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import { Checkbox, Grid, TextField } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { fire } from "../firebase";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    headerTitle: {
      display: "inline-block",
      fontSize: "1.2rem",
      fontWeight: "lighter",
      lineHeight: "50px",
      margin: 0,
      verticalAlign: "top",
      color: "white",
      textDecoration: "none",
      "& a": {
        color: "white",
        textDecoration: "none",
      },
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    loginbtn: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgb(48,172,251)",
      color: "white",
      marginTop: "5px",
      borderRadius: "20px",
      border: "none",
      fontSize: "15pt",
      fontWeight: 700,
      transition: "1s",
      outline: "none",
      cursor: "pointer",
      marginBottom: "20px",
      "&:hover": {
        transform: "scale(1.03)",
        letterSpacing: "4px",
        backgroundColor: "#7FFFD4",
        color: "#1E90FF",
      },
    },
    aligns: {
      alignSelf: "center",
    },
  })
);

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ButtonAppBar() {
  const bodyClassList = document.body.classList;

  const toggleNavBar = () => {
    bodyClassList.remove("searchbar-opened");
    bodyClassList.toggle("navbar-opened");
  };

  const [open, setOpen] = React.useState(false);

 const handleClickLoginOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearError = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearError();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password).then(() => {
        // Sign-out successful.
        handleClose()
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(error.message);
            break;
          case "auth/wrong-password":
            setPasswordError(error.message);
        }
      })


  };

  const handleSignUp = () => {
    clearError();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(error.message);
            break;
          case "auth/weak-password":
            setPasswordError(error.message);
        }
      });
  };

  const handleLogOut = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user as any);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  });

  return (
    <>
      <div className={classes.root}>
        <header className="header">
          <AppBar position="static" className="header-animation">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleNavBar}
                style={{ position: "relative" }}
              >
                <div className="ham-button">
                  <span className="ham-border ham-border-top">
                    <span className="ham-border-inner ham-border-inner-top" />
                  </span>
                  <span className="ham-border ham-border-bottom">
                    <span className="ham-border-inner ham-border-inner-bottom" />
                  </span>
                </div>
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                <img src={logo} className="logo" />
                <h1 className={classes.headerTitle}>
                  <a href="/">
                    <strong>HKJC</strong>KILLER
                  </a>
                </h1>
              </Typography>
              {user ? (
                <Button color="inherit" onClick={handleLogOut}>
                  Logout
                </Button>
              ) : (
                <Button color="inherit" onClick={handleClickLoginOpen}>
                  Login
                </Button>
              )}
            </Toolbar>
          </AppBar>
          <ul className="nav-list">
            <li className="logo">
              <a href="/">LOGO</a>
            </li>
            <li>
              <NavLink to="/" onClick={toggleNavBar}>
                7M專區
              </NavLink>
            </li>
            <li>
              <NavLink to="/KnowBall" onClick={toggleNavBar}>
                懂球帝專區
              </NavLink>
            </li>
            <li>
              <NavLink to="/AiScore" onClick={toggleNavBar}>
                AI分析專區
              </NavLink>
            </li>
            <li>
              <NavLink to="/LiveScore" onClick={toggleNavBar}>
                即時比分(BETA)
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={toggleNavBar}>
                會員中心
              </NavLink>
            </li>
            {user ? (            <li>
              <NavLink to="/" onClick={handleLogOut}>
                登出
              </NavLink>
            </li>):("")}

          </ul>
        </header>

        <div>
          <LoginForm
            open={open}
            handleClose={handleClose}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
          />
        </div>
      </div>
    </>
  );
}
