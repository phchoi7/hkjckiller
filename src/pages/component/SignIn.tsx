import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import { InputAdornment } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import {fire} from '../../firebase'

const useStyles = makeStyles((theme) => ({
  paper: {
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
  }
}));

export default function SignIn({ email,setEmail,password,setPassword,handleLogin,hasAccount,setHasAccount, emailError,passwordError }:any) {
  const classes = useStyles();
 
 
  const handleChange = () => {
    
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登入系統
        </Typography>
        <div className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            helperText={emailError}
            autoFocus
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            helperText={passwordError}
            value={password}
            onChange = {e=> setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        登入
      </Button>
        </div>
      </div>
    </Container>
  );
}