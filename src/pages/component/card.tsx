import React, { useEffect, useState } from "react";

import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Collapsible,
  Heading,
  Grommet,
  Image,
  Paragraph,
  Avatar,
  TableCell,
  TableRow,
  TableBody,
  Table,
} from "grommet";

import { FormDown, FormUp, Favorite, ShareOption } from "grommet-icons";
import { CenterLayer } from "./button";
import { Chip, makeStyles, TableHead, Typography } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import fetchData from "../fetchData.json";

import styled from "styled-components";
import { List, Menu } from "grommet";
import { More } from "grommet-icons";
import { grommet } from "grommet/themes";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import { fire } from "../../firebase";
import { UnlockButton } from "./unlock";

const styledDiv = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const data: any = [];

for (let i = 0; i < 40; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

export const theme = {
  global: {
    font: {
      family: `Comic Sans MS, -apple-system,
         BlinkMacSystemFont, 
         "Segoe UI", 
         Roboto`,
    },
  },
  card: {
    elevation: "none",
    background: "light-2",
    footer: {
      pad: "medium",
    },
  },
};
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});


export const RichFooter = (props: { row: any }) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);
  const [user, setUser] = useState("");
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


  const Action = () => (
    <Grommet theme={grommet}>
      <Box pad="large">
      {user ? ( <>   {fetchData
          .filter((fetched) => fetched.userId == row[1])
          .map((data: any) => {
            return (
              <>
                <div>
                  <div>
                    {data.league} &nbsp; {data.postPredictTime}{" "}
                    {data.betCost >= 108 ? (
                      <ThumbUpAltOutlinedIcon color="secondary" />
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {data.home} vs {data.away} &nbsp; {data.betType}&nbsp;(
                    {data.betSorce})
                  </div>
                  <div>
                    <CenterLayer
                      matchTeam={` ${data.home} vs ${data.away} `}
                      betAnswer={data.betAnswer}
                      betType={`${data.betType}`}
                    />
                  </div>
                </div>
              </>
            );
          })}</>):(<UnlockButton  />)}
      
      </Box>
    </Grommet>
  );

  const ExpandButton = ({ ...rest }) => {
    const Icon = open ? FormUp : FormDown;
    return (
      <Button
        hoverIndicator="light-4"
        icon={<Icon color="brand" />}
        {...rest}
      />
    );
  };
  return (
    <Grommet theme={theme}>
      <Box pad="medium" align="start">
        <Card elevation="large" width="medium" style={{backgroundColor:'white'}}>
          <Box pad={{ horizontal: "medium" }} responsive={true } style={{backgroundColor:'white'}}>
            <Avatar
              src={row[3]}
              a11yTitle="avatar"
              margin={{ vertical: "medium" }}
              justify={"center"}
            />
            <Heading level="3" margin={{ vertical: "medium" }}>
              {row[2]}
            </Heading>
            <Paragraph margin={{ top: "none" }}>{row[7]}</Paragraph>
          </Box>
          <CardFooter style={{backgroundColor:'white'}}>
            <Box direction="row" align="center" gap="small">
              <Button
                icon={<Favorite color={favorite ? "red" : undefined} />}
                hoverIndicator
                onClick={() => {
                  setFavorite(!favorite);
                }}
              />
              <Button icon={<ShareOption color="plain" />} hoverIndicator />
              <Chip
                variant="outlined"
                size="small"
                icon={<WhatshotIcon />}
                label={betResult(row[8])}
                clickable
                color="secondary"
                deleteIcon={<DoneIcon />}
              />
              排名: {row[0]}
            </Box>
            <ExpandButton onClick={() => setOpen(!open)} />
          </CardFooter>
          <Collapsible open={open}>
            <Action />
          </Collapsible>
        </Card>
      </Box>
    </Grommet>
  );
};

RichFooter.storyName = "Rich footer";

export default {
  title: `Layout/Card/Rich footer`,
};
