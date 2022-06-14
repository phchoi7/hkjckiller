import { useState } from "react";
import { Box, Button, Card, CardBody, Grommet, Image } from "grommet";

import "../LiveScore.css";
import { theme } from "./card";
import { createStyles, makeStyles } from "@material-ui/core";
import { fadeIn } from "react-animations";

const useStyles = makeStyles((theme) =>
  createStyles({
    matchStatus: {
      backgroundColor: "var(--color-bg-alert)",
      color: "var(--color-text-alert)",
      borderBottom: "2px solid rgba(48, 48, 48, 0.1)",
      padding: "8px 12px",
      borderRadius: "6px",
      fontWeight: 600,
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      lineHeight: 1,
      marginRight: "auto",
      animation: "Twinkle 2.5s infinite",
      "&:before": {
        content: '""',
        display: "block",
        width: "6px",
        height: "6px",
        backgroundColor: "currentColor",
        borderRadius: "50%",
        marginRight: "8px",
        animation: "Twinkle 2.5s infinite",
        // "@keyframes twinkle": { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      fadeIn: {
        animation: "x 1s",
      },
    },

    Mobile: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    match: {
      backgroundColor: "var(--color-bg-primary)",
      display: "flex",
      flexDirection: "column",
      minWidth: "600px",
      borderRadius: "10px",
      boxShadow: "0 0 2px 0 rgba(#303030, 0.1), 0 4px 4px 0 rgba(#303030, 0.1)",
    },
    matchHeader: {
      borderBottom: "2px solid rgba(48, 48, 48, 0.1)",
      padding: "16px",
    },
    matchTournament: {
      display: "flex",
      alignItems: "center",
      fontWeight: 600,
      img: { width: "20px", marginRight: "12px" },
    },
    matchActions: { display: "flex", marginLeft: "auto" },
    btnIcon: {
      border: "0",
      backgroundColor: "transparent",
      color: "var(--color-text-icon)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    matchContent: { display: "flex", position: "relative" },
    column: {
      padding: "32px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "calc(100% / 3)",
    },
    team: { display: "flex", flexDirection: "column", alignItems: "center" },
    teamLogo: {
      width: "100px",
      height: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--color-bg-primary)",

      img: { width: "50px" },
    },
    teamName: {
      textAlign: "center",
      marginTop: "24px",
      fontSize: "20px",
      fontWeight: 600,
    },
    matchDetails: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    ".match-date, .match-referee": {
      fontSize: "14px",
      color: "var(--color-text-secondary)",
      strong: { color: "var(--color-text-primary)" },
    },
    matchScore: { marginTop: "12px", display: "flex", alignItems: "center" },
    matchScoreNumber: {
      fontSize: "48px",
      fontWeight: 600,
      lineHeight: 1,
      "&--leading": { color: "var(--color-theme-primary)" },
    },
    matchScoreDivider: {
      fontSize: "28px",
      fontWeight: 700,
      lineHeight: 1,
      color: "var(--color-text-icon)",
      marginLeft: "10px",
      marginRight: "10px",
    },
    matchTimeLapsed: {
      color: "#DF9443",
      fontSize: "14px",
      fontWeight: 600,
      marginTop: "8px",
    },
    matchReferee: { marginTop: "12px" },
    matchBetOptions: {
      display: "flex",
      marginTop: "8px",
      paddingBottom: "12px",
    },
    matchBetOption: {
      marginLeft: "4px",
      marginRight: "4px",
      border: "1px solid var(--color-text-icon)",
      backgroundColor: "#F9f9f9",
      borderRadius: "2px",
      color: "var(--color-text-secondary)",
      fontSize: "14px",
      fontWeight: 600,
      padding: "4px 8px",
    },
    matchBetPlace: {
      position: "absolute",
      bottom: "-3px",
      left: "50%",
      transform: "translateX(-50%)",
      boxShadow: "0 4px 8px 0 rgba(#303030, 0.25)",
    },
    boxStyle: {
      width: "min-content",
    },
  })
);

function LiveScoreCard({ data }: any) {
  const [isLoading, setLoading] = useState(true);
  const [matchProvider, setMatchProvider] = useState<any>();

  console.log("the match data", data);

  const classes = useStyles();

  return (
    <>
      <Grommet theme={theme}>
        <Box pad="medium" align="center" style={{ position: "relative" }}>
          <Card elevation="large" style={{ backgroundColor: "white" }}>
            <CardBody pad="medium" justify="center">
              <Box
                pad={{ horizontal: "medium" }}
                responsive={true}
                style={{ backgroundColor: "white" }}
              >
                <Box
                  direction="row"
                  align="center"
                  gap="small"
                  className={classes.matchHeader}
                  responsive={true}
                >
                  <div className={classes.matchStatus}>Live</div>
                </Box>

                <Box
                  direction="row"
                  align="center"
                  gap="small"
                  className={classes.boxStyle}
                  justify="center"
                  responsive={true}
                >
                  <Box
                    direction="column"
                    align="center"
                    gap="small"
                    className={classes.boxStyle}
                    justify="center"
                    responsive={true}
                  >
                    <div className="team team--home">
                      <div className={classes.teamLogo}>
                        <Image
                          fit="cover"
                          src={`https://data.7m.com.cn/team_data/${data[5]}/logo_Img/club_logo.jpg`}
                        />
                      </div>

                      <h2 className="team-name">{data[6]}</h2>
                    </div>
                  </Box>

                  <Box
                    direction="column"
                    align="center"
                    gap="small"
                    className={classes.boxStyle}
                    justify="center"
                    responsive={true}
                  >
                    <div className="match-date">{data[1]}</div>
                    <div className={classes.matchTournament}>{data[2]}</div>
                    <div className={classes.matchScore}>
                      <span className="match-score-number match-score-number--leading">
                        {data[7]}
                      </span>
                      <span className="match-score-divider">:</span>
                      <span className="match-score-number">{data[10]}</span>
                    </div>
                    <div className={classes.matchTimeLapsed}>72'</div>
                    <div className={classes.matchReferee}>
                      此場高手: <strong>19個</strong>
                    </div>
                    <div className={classes.matchBetOptions}>
                      <button className="match-bet-option">
                        讓 {data[14]}
                      </button>
                      <button className="match-bet-option">
                        {" "}
                        主{data[15]}
                      </button>
                      <button className="match-bet-option">客{data[16]}</button>
                    </div>

                    <Button
                      className={classes.matchBetPlace}
                      primary
                      label="Details"
                      active
                      style={{
                        background: "rgb(125, 76, 219)",
                        color: "white",
                      }}
                    />
                  </Box>
                  <Box
                    direction="column"
                    align="center"
                    gap="small"
                    justify="center"
                    className={classes.boxStyle}
                    responsive={true}
                  >
                    <div className="team team--away">
                      <div className={classes.teamLogo}>
                        <Image
                          fit="cover"
                          src={`https://data.7m.com.cn/team_data/${data[8]}/logo_Img/club_logo.jpg`}
                        />
                      </div>
                      <h2 className="team-name">{data[9]}</h2>
                    </div>
                  </Box>
                </Box>
              </Box>
            </CardBody>
          </Card>
        </Box>
      </Grommet>
    </>
  );
}

export default LiveScoreCard;
