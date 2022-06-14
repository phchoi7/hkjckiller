import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const pressed = (event:any) =>{


      const selectedIndex = event.target.options.selectedIndex;
          console.log(event.target.options[selectedIndex].getAttribute('key'));


  }

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

          <ListItem button>
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={"十大高手"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={"二十大高手"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={"熱門高手"} />
          </ListItem>

      </List>
      <Divider />
      <List>
      <ListItem button>
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={"全部高手"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={"最多人解鎖高手"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon> <InboxIcon /></ListItemIcon>
            <ListItemText primary={"勝算最高的貼士(測試版)"} />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {(['bottom'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <FilterListIcon onClick={toggleDrawer(anchor, true)} />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
