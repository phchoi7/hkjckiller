import { useState } from "react";
import { Box, Button, Card, CardBody, Grommet, Image } from "grommet";

import "../LiveScore.css";
import { theme } from "./card";
import { Badge, createStyles, makeStyles, Typography } from "@material-ui/core";
import { fadeIn } from "react-animations";
import { checkName } from "./AiScoreCard.function";
import { ThemeType } from "grommet/themes";
import { Alert, Filter, Notification, MailOption } from "grommet-icons";
import { deepMerge } from "grommet/utils";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

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
    matchSelectedOption: {
      color: "#613cea",
      backgroundColor: "rgba(97, 60, 234, 0.1)",
      borderColor: "rgba(97, 60, 234, 0.5)",
    },
    matchButton: {
      display: "flex",
      marginTop: "8px",
      paddingBottom: "12px",
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

interface AiData {
  betRate: any;
  fixedNam: any;
  homeLogo: any;
  homeTeam: string;
  homeTeamNo: number;
  isCode: any;
  isOk: any;
  matchDate: any;
  matchDesc: any;
  matchId: number;
  matchLong: string;
  matchResult: string;
  matchTime: string;
  recPercent: number;
  result1: string;
  result2: any;
  rowNo: string;
  typeName: string;
  visitLogo: any;
  visitTeam: string;
  visitTeamNo: any;
  week: any;
}

function AiScoreCard({ data }: any) {
  const [isLoading, setLoading] = useState(true);
  const [matchProvider, setMatchProvider] = useState<any>();
  var convert = require("chinese_convert");

  console.log("the match data", data);

  const classes = useStyles();

  return (
    <>
      <Grommet theme={theme}>
        <div className="card">
          <div className="card__header matches__nav">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link active">All matches</a>
              </li>{" "}
              <li className="nav-item">
                <a className="nav-link">Live Play</a>
              </li>{" "}
              <li className="nav-item">
                <a className="nav-link">Completed</a>
              </li>{" "}
              <li className="nav-item">
                <a className="nav-link">Scheduled</a>
              </li>
            </ul>{" "}
            <a className="matches__agenda btn--icon">
              <span className="sr-only">Agenda</span>
              <svg
                viewBox="0 0 24 24"
                style={{ width: "24px", height: "24px" }}
              >
                <path
                  fill="currentColor"
                  d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1"
                />
              </svg>
            </a>
          </div>{" "}
          <div className="card__body matches__data">
            <table>
              <thead>
                <tr>
                  <th>日子</th> <th>賽事</th> <th>系統分析勝率</th>{" "}
                  <th>系統選擇</th> <th>預測結果</th> <th>數據分析</th>{" "}
                </tr>
              </thead>{" "}
              {/* the body start */}
              <tbody>
                {data &&
                  data.map((data: AiData) => (
                    <tr>
                      <td>
                        <span className="matches__time matches__time--live">
                          {data.matchTime}
                        </span>
                        {data.matchLong === "未" ? (
                          <span className="tag tag--icon">
                            <svg width={6} height={6} viewBox="0 0 8 8">
                              <circle fill="#613cea" cx={4} cy={4} r={4} />
                            </svg>
                            未開始
                          </span>
                        ) : data.matchLong === "完" ? (
                          <span className="tag tag--red tag--icon">
                            <svg width={6} height={6} viewBox="0 0 8 8">
                              <circle fill="#efefef" cx={4} cy={4} r={4} />
                            </svg>
                            己完場
                          </span>
                        ) : (
                          ""
                        )}
                      </td>{" "}
                      <td>
                        <div className="score score--vertical">
                          <div className="score__team score__team--vertical">
                            <Typography variant="subtitle1">
                              {convert.cn2tw(checkName(data.homeTeam))}
                            </Typography>
                          </div>{" "}
                          <p className="score__result score__result--vertical">
                            <Typography
                              variant="button"
                              className="score__goals"
                            >
                              {data.result1}
                            </Typography>
                          </p>{" "}
                          <div className="score__team score__team--vertical">
                            <Typography variant="caption">
                              {convert.cn2tw(checkName(data.visitTeam))}
                            </Typography>
                          </div>
                        </div>
                      </td>{" "}
                      <td>
                        <Typography
                          className="tag tag--green rating rating--up"
                          variant="subtitle1"
                        >
                          {" "}
                          {data.recPercent} %
                        </Typography>
                      </td>{" "}
                      <td>
                        <div>
                          <Button
                            a11yTitle={
                              data.matchResult === "胜" ? "主隊" : "客隊"
                            }
                            label={
                              <Typography>
                                {data.matchResult === "胜" ? "主隊" : "客隊"}
                              </Typography>
                            }
                            onClick={() => {}}
                          />
                        </div>
                      </td>{" "}
                      <td>
                        {data.isOk === "1" ? <CheckCircleOutlineIcon /> : ""}
                      </td>{" "}
                      <td>
                        <a className="matches__stats btn btn--icon">
                          <span className="sr-only">Stats</span>
                          <svg width={24} height={24} viewBox="0 0 24 24">
                            <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
              {/* the body ended */}
            </table>
          </div>
        </div>
      </Grommet>
    </>
  );
}

export default AiScoreCard;
