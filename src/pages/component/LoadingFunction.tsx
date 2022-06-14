import React, { Component } from "react";
import "./Load.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Backdrop, createStyles, makeStyles, Theme } from "@material-ui/core";
import football from "../../asset/1246386.png";
import { grommet, Box, Button, Grommet, Layer, Spinner, Text } from "grommet";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    box: {
      margin: "0 auto",
      width: "40px",
      height: "140px",
      position: "relative",
    },
    shadow: {
      position: "absolute",
      width: "100%",
      height: "10px",
      backgroundColor: "grey",
      bottom: "0",
      borderRadius: "100%",
      transform: "scaleX(.8)",
      opacity: 0.6,
      animation: "$shadowScale 1s linear infinite",
    },
    gravity: {
      width: "40px",
      height: "40px",
      animation: "$bounce 1s cubic-bezier(0.68, 0.35, 0.29, 0.54) infinite",
    },
    ball: {
      width: "40px",
      height: "40px",
      backgroundImage:
        "url('https://image.flaticon.com/icons/svg/33/33736.svg')",
      backgroundSize: "cover",
      animation: "$roll .6s linear infinite",
    },
    container: {
      marginTop: "100px",
    },
    "@keyframes roll": { "0%": {}, "100%": { transform: "rotate(360deg)" } },
    "@keyframes bounce": {
      "0%": {},
      "50%": { transform: "translateY(100px)" },
      "100%": {},
    },
    "@keyframes shadowScale": {
      "0%": {},
      "50%": { transform: "scaleX(1)", opacity: 0.8 },
      "100%": {},
    },
  })
);

function Loadingfunction() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <Box
      align="center"
      justify="center"
      gap="small"
      direction="row"
      alignSelf="center"
      pad="large"
    >
      <Spinner />
      <Text>Loading...</Text>
    </Box>
  );
}

export default Loadingfunction;
