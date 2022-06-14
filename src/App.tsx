import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ButtonAppBar from "./pages/ButtonAppBar";
import ForgotPassword from "./pages/component/ForgotPassword";
import LiveScorePage from "./pages/LiveScorePage";
import KnowBallPage from "./pages/KnowBallPage";
import AiScorePage from "./pages/AiScorePage";
import BottomNavigation from "./pages/component/BottomNavigation";
import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    Mobile: {
      [theme.breakpoints.up('md')]: {
        display: 'none'
      },
    },
    root:{
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
    }
  }),
);

function App() {
  const classes = useStyles();
  return (

    <Router>
      <div className="App">
        <ButtonAppBar />
        <div className={classes.root}>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/KnowBall">
            <KnowBallPage />
          </Route>
          <Route path="/AiScore">
            <AiScorePage />
          </Route>
          <Route path="/LiveScore">
            <LiveScorePage />
          </Route>
        </Switch>
        <div className={classes.Mobile} >
          <BottomNavigation />
        </div>
        </div>
      </div>
    </Router>

  );
}

export default App;
