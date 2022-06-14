import { useState } from "react";
import "./App.css";
import CollapsibleTable from "./component/CollapsibleTable";
import Loadingfunction from "./component/LoadingFunction";
import LoginForm from "./LoginForm";
import "./Login.css";
import Modal from "./Modal";
import { createStyles, Grid, makeStyles } from "@material-ui/core";
import { RichFooter } from "./component/card";

const useStyles = makeStyles((theme) =>
  createStyles({
    Desktop: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },

    Mobile: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

function MainPage() {
  const [isShowLogin, setIsShowLogin] = useState(true);
  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };
  const classes = useStyles();
  return (
    <div className="TableCollapCon">
      <CollapsibleTable />

    </div>
  );
}

export default MainPage;
