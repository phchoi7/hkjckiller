import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TvIcon from '@material-ui/icons/Tv';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: "rgb(45, 54, 69)",
  boxShadow:
    "rgb(0 0 0 / 16%) 0px 1px 8px 0px, rgb(0 0 0 / 8%) 0px 3px 4px 0px",
  height: "78px"
  },

  actionItemStyles: {
opacity:0.65,
        color: 'rgba(255, 255, 255, 0.87)',
    "&$selected": {
      color: 'rgba(255, 255, 255, 0.87)',
      opacity:1
    }
  },
  selected: {},

  'MuiBottomNavigationAction-root': {

    root: {

        opacity:0.45,
        color: 'rgba(255, 255, 255, 0.87)'
      
    },
    selected: {
      color: 'rgba(255, 255, 255, 0.87)',
      opacity:1
    }
  }
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('足球貼士');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.stickToBottom}>
      <BottomNavigationAction classes={{
      root: classes.actionItemStyles,
      selected: classes.selected
    }}  label="足球貼士" value="足球貼士" icon={<SportsSoccerIcon />} component={Link} to='/' />
      <BottomNavigationAction classes={{
      root: classes.actionItemStyles,
      selected: classes.selected
    }}label="最愛高手" value="最愛高手" icon={<FavoriteIcon />} component={Link} to='/KnowBall'/>
      <BottomNavigationAction classes={{
      root: classes.actionItemStyles,
      selected: classes.selected
    }}label="比分直播" value="比分直播" icon={<TvIcon />} component={Link} to='/LiveScore'/>
      <BottomNavigationAction classes={{
      root: classes.actionItemStyles,
      selected: classes.selected
    }}label="會員資料" value="會員資料" icon={<AccountCircleIcon />} component={Link} to='/'/>
    </BottomNavigation>
  );
}
