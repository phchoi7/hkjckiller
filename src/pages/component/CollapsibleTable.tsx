import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useEffect } from "react";
import fetchData from "../fetchData.json";
import LoadingFunction from "./LoadingFunction";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import {
  Avatar,
  createStyles,
  FormControl,
  InputLabel,
  NativeSelect,
  TablePagination,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import "./Table.css";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import TemporaryDrawer from "./TemporaryDrawer";
import BasicPagination from "./BasicPagination";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";
import { RichFooter, theme } from "./card";
import LoadingSmall from "./LoadingSmall";
import { fire } from "../../firebase";
import { Card, grommet, Grommet } from "grommet";
import { UnlockButton } from "./unlock";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {},
      display: "flex",
      justifyContent: "center",
      margin: "20px",
    },
    Desktop: {
      [theme.breakpoints.down("sm")]: {
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

const useToolbarStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            // backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(1),
    },
    TopBar: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

function Row(props: { row: any }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [user, setUser] = React.useState("");

  const style = useStyles();
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user as any);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  });

  function betResult(data: any) {
    var _str = "";
    if (data) {
      var _winRate = 0;
      var _num = 0;
      var count = data.length;
      if (count != "" && count != null && count > 1) {
        for (var i = 0; i < count; i++) {
          if (data[i] == 1) {
            _num++;
          }
        }
        _winRate = _num / data.length;
        if (_winRate > 0.6) {
          if (_num == count) {
            _str = _num + "連勝";
          } else {
            _str = count + "中" + _num;
          }
        }
      }
    }
    return _str;
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <Chip
            label={row[2]}
            variant="outlined"
            color="primary"
            avatar={<Avatar src={row[3]} />}
          />
        </TableCell>
        <TableCell align="center">{row[0]}</TableCell>
        <TableCell align="center">{row[7]}</TableCell>
        <TableCell align="center">
          <Chip
            variant="outlined"
            size="small"
            icon={<WhatshotIcon />}
            label={betResult(row[8])}
            clickable
            color="secondary"
            deleteIcon={<DoneIcon />}
          />
        </TableCell>
        <TableCell align="right">
          <Typography variant="h4" component="h4" color="secondary">
            {row[9] * 100} %
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                高手推薦記錄
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">聯賽</TableCell>
                    <TableCell align="center">比賽名稱</TableCell>
                    <TableCell align="center">盤口</TableCell>
                    <TableCell align="center">推薦選擇</TableCell>
                    <TableCell align="center">發怖時間</TableCell>
                  </TableRow>
                </TableHead>
                {user ? (
                  <TableBody>
                    {fetchData
                      .filter((fetched) => fetched.userId == row[1])
                      .map((data: any) => {
                        return (
                          <TableRow key={row[1]}>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {data.league}
                            </TableCell>
                            <TableCell align="center">
                              {data.home} vs {data.away}&nbsp;{" "}
                              {data.betCost >= 108 ? (
                                <ThumbUpAltOutlinedIcon color="secondary" />
                              ) : (
                                ""
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {data.betType}&nbsp;({data.betSorce})
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                icon={<SportsSoccerIcon />}
                                label={data.betAnswer}
                                color="secondary"
                              />
                            </TableCell>
                            <TableCell align="center">
                              {data.postPredictTime}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                ) : (
                  <UnlockButton />
                )}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const EnhancedTableToolbar = ({ topTen, recommend, loadAll }: any) => {
  const classes = useToolbarStyles();
  const [state, setState] = React.useState<{
    age: string | number;
    name: string;
  }>({
    age: "",
    name: "hai",
  });
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Toolbar className={classes.TopBar}>
      <div>
        <Chip
          variant="outlined"
          size="small"
          icon={<WhatshotIcon />}
          label={"十大高手"}
          clickable
          onClick={topTen}
          color="secondary"
          deleteIcon={<DoneIcon />}
          style={{ marginRight: "5px" }}
        />
        <Chip
          variant="outlined"
          size="small"
          icon={<WhatshotIcon />}
          label={"熱門推薦"}
          clickable
          onClick={recommend}
          color="secondary"
          deleteIcon={<DoneIcon />}
          style={{ marginRight: "5px" }}
        />
        <Chip
          variant="outlined"
          size="small"
          icon={<WhatshotIcon />}
          label={"全部高手"}
          clickable
          onClick={loadAll}
          color="secondary"
          deleteIcon={<DoneIcon />}
        />
      </div>

      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <TemporaryDrawer />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default function CollapsibleTable() {
  const [tipsProvider, setTipsProvider] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [mode, setMode] = React.useState("default");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [fetchData, setFetchData] = useState(0);
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [user, setUser] = useState("");

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  async function fetchMoreListItems() {
    const ProxyServer = "https://cors.bridged.cc/";
    // const ProxyServer = "https://api.allorigins.win/get?url=";
    // const ProxyServer = "https://thingproxy.freeboard.io/fetch/";

    // fetch(
    //   `${ProxyServer}${encodeURIComponent(
    //     `https://txt-api.7m.com.cn/tips/expert/hotExpertList?lan=1&ballType=1&id=0&plat=4&v=1628183487476`
    //   )}`
    // )
    //   .then((response) => {
    //     if (response.ok) return response.json();
    //     throw new Error("Network response was not ok.");
    //   })
    //   .then((data) => console.log(data.contents));

    const res = await fetch(
      `${ProxyServer}http://txt-api.7m.com.cn/tips/expert/expertList?id=${fetchData}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          origin: "*",
          "x-request-url": "txt-api.7m.com.cn",
          "x-cors-grida-api-key": "fec76fa0-7a9f-44e5-b4da-1ad50c338b43",
        },
      }
    );

    // const res = await fetch(
    //   `${ProxyServer}http://localhost:8080/getTopExpert`,
    //   {
    //     method: "GET",
    //     mode: "cors",
    //     headers: { origin: "*", "x-request-url": "txt-api.7m.com.cn" },
    //   }
    // );

    // const res = await fetch(`http://localhost:8080/getTopExpert`, {
    //   method: "GET",
    // });

    const json = await res.json();

    console.log("json", json);

    if (fetchData < 10) {
      setTipsProvider(json.data.list);
    } else {
      setTipsProvider((prevState: any) => [...prevState, ...json.data.list]);
    }

    setLoading(false);
    setIsFetching(false);
    setFetchData(fetchData + 10);
  }

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const loadHotExpert = async () => {
    const ProxyServer = "https://cors.bridged.cc/";

    const res = await fetch(
      `${ProxyServer}https://txt-api.7m.com.cn/tips/guess/squareData`,
      {
        method: "GET",
        mode: "cors",
        headers: { origin: "*", "x-request-url": "txt-api.7m.com.cn" },
      }
    );

    const json = await res.json();
    setTipsProvider(json.data.recommends.list);
    setLoading(false);
  };

  const loadAllPage = async () => {
    const ProxyServer = "https://cors.bridged.cc/";

    // let n = 0;
    // let fetchedJson:any = [];
    // while (n <= 50) {
    // const res = await fetch(`${ProxyServer}https://txt-api.7m.com.cn/tips/expert/expertList?id=${n}`, {
    //         method: "GET",
    //         mode: "cors",
    //         headers: { origin: "*", "x-request-url": "txt-api.7m.com.cn" },
    //       });
    //       const json = await res.json();

    //       for (const jsons of json.data.list) { // Note I've renamed the `numbers` array to be plural
    //         fetchedJson.push(jsons);
    //     }

    //       n = n +10;
    //       console.log(fetchedJson)
    //       setTipsProvider(fetchedJson)

    // }

    const res = await fetch(
      `${ProxyServer}https://txt-api.7m.com.cn/tips/expert/hotExpertList`,
      {
        method: "GET",
        mode: "cors",
        headers: { origin: "*", "x-request-url": "txt-api.7m.com.cn" },
      }
    );

    const json = await res.json();
    setTipsProvider(json.data.list);
  };

  useEffect(() => {
    if (mode == "default") {
      fetchMoreListItems();
    } else if (mode == "recommend") {
      loadHotExpert();
    } else if (mode == "all") {
      loadAllPage();
    }
  }, [mode]);

  const topTen = () => {
    setLoading(true);
    setMode("default");
  };

  const recommend = () => {
    setLoading(true);
    setMode("recommend");
  };

  const loadAll = () => {
    setLoading(true);
    setMode("all");
  };

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchMoreListItems();
  };

  return (
    <>
      {isLoading ? (
        <LoadingFunction />
      ) : (
        <Grid container item xs={12} spacing={1} className={classes.Desktop}>
          <Paper className="container">
            <EnhancedTableToolbar
              topTen={topTen}
              recommend={recommend}
              loadAll={loadAll}
            />
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="center">高手名字</TableCell>
                    <TableCell align="center">排名</TableCell>
                    <TableCell align="center">9 up</TableCell>
                    <TableCell align="center">狀態</TableCell>
                    <TableCell align="center">嬴盤率</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(() => {
                    if (page === 1) {
                      return (
                        tipsProvider &&
                        tipsProvider
                          ?.slice(0, 10)
                          .map((data: any) => <Row key={data} row={data} />)
                      );
                    } else if (page === 2) {
                      return (
                        tipsProvider &&
                        tipsProvider
                          ?.slice(11, 20)
                          .map((data: any) => <Row key={data} row={data} />)
                      );
                    } else if (page === 3) {
                      return (
                        tipsProvider &&
                        tipsProvider
                          ?.slice(21, 30)
                          .map((data: any) => <Row key={data} row={data} />)
                      );
                    } else if (page === 4) {
                      return (
                        tipsProvider &&
                        tipsProvider
                          ?.slice(31, 40)
                          .map((data: any) => <Row key={data} row={data} />)
                      );
                    } else if (page === 5) {
                      return (
                        tipsProvider &&
                        tipsProvider
                          ?.slice(41, 50)
                          .map((data: any) => <Row key={data} row={data} />)
                      );
                    } else if (page === 6) {
                      return (
                        tipsProvider &&
                        tipsProvider
                          ?.slice(51, 60)
                          .map((data: any) => <Row key={data} row={data} />)
                      );
                    } else if (page === 7) {
                      return (
                        tipsProvider &&
                        tipsProvider
                          ?.slice(61, 70)
                          .map((data: any) => <Row key={data} row={data} />)
                      );
                    } else if (page === 8) {
                      return (
                        tipsProvider &&
                        tipsProvider
                          ?.slice(71, 80)
                          .map((data: any) => <Row key={data} row={data} />)
                      );
                    } else if (page === 9) {
                      return (
                        tipsProvider &&
                        tipsProvider
                          ?.slice(81, 90)
                          .map((data: any) => <Row key={data} row={data} />)
                      );
                    } else if (page === 10) {
                      return (
                        tipsProvider &&
                        tipsProvider
                          ?.slice(91, 100)
                          .map((data: any) => <Row key={data} row={data} />)
                      );
                    } else {
                      return (
                        tipsProvider &&
                        tipsProvider
                          ?.slice(0, 9)
                          .map((data: any) => <Row key={data} row={data} />)
                      );
                    }
                  })()}
                </TableBody>
              </Table>
              <Grid item xs={12}>
                <div className={classes.root}>
                  <Pagination
                    count={10}
                    color="primary"
                    showFirstButton
                    onChange={handleChange}
                  />
                </div>
              </Grid>
            </TableContainer>
          </Paper>
        </Grid>
      )}
      <Grid
        container
        item
        xs={12}
        className={classes.Mobile}
        justifyContent="center"
      >
        {tipsProvider &&
          tipsProvider
            ?.slice(0, 100)
            .map((data: any) => <RichFooter row={data} />)}
        {isFetching && <LoadingSmall />}
      </Grid>
    </>
  );
}
