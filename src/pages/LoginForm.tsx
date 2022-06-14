import React, { useState } from "react";
import { createStyles, Theme, withStyles, WithStyles,makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../logo.png"
import "./App.css";
import "./_navbar.css";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { Checkbox, Grid, TextField } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import SignIn from "./component/SignIn";
import Regsiter from "./component/Regsiter";
import ForgotPassword from "./component/ForgotPassword";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
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
    headerTitle:{
      display:'inline-block',
      fontSize:'1.2rem',
      fontWeight:'lighter',
      lineHeight:'50px',
      margin:0,
      verticalAlign:'top',
      color:'white',
      textDecoration:'none',
      '& a': {
        color:'white',
      textDecoration:'none',
      }
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    loginbtn:{
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
    '&:hover':{
      transform: "scale(1.03)", 
  letterSpacing: "4px", 
  backgroundColor: "#7FFFD4", 
  color: "#1E90FF"
    }
    },
    aligns:{
      alignSelf: "center"
    }

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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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


const LoginForm = ({ handleClose,open,email,setEmail,password,setPassword,handleLogin,handleSignUp,hasAccount,setHasAccount,emailError,passwordError }:any) => {
    const classes = useStyles();
    const [Mode, setMode] = useState("Login");

    const handleCloseAndReset = () => {
        handleClose();
        setMode("Login");
      };

    const forGotPasswordFunction = () => {
        setMode("Forgot");
      };

      const LoginFunction = () => {
        setMode("Login");
      };

      const RegisterFunction = () => {
        setMode("Register");
      };

  return (
    <>
    <Dialog onClose={handleCloseAndReset} aria-labelledby="customized-dialog-title" open={open}>
    <DialogTitle  id="customized-dialog-title" onClose={handleCloseAndReset}>
    </DialogTitle>
    <DialogContent >
        {Mode === "Login" ? <SignIn email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} emailError={emailError}
            passwordError={passwordError}  /> : Mode === "Register" ? <Regsiter /> : Mode ==="Forgot" ? <ForgotPassword />:''}
    </DialogContent>
    <DialogActions >
    <Grid container>
            <Grid item xs>
            <Button autoFocus onClick={forGotPasswordFunction} color="primary">
            忘記密碼？
      </Button>
            </Grid>
            <Grid item>
            {Mode ==="Login" ?  <Button autoFocus onClick={RegisterFunction} color="primary">
            立即註冊!
      </Button> : <Button autoFocus onClick={LoginFunction} color="primary">
            登入!
      </Button> }
            
            </Grid>
          </Grid>
    </DialogActions>
  </Dialog>
  </>

  );
};

export default LoginForm;
