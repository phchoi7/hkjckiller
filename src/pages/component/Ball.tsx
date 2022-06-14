import React from 'react';

import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";


// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   loginbtn:{
//     width: "100%", 
//   justifyContent: "center", 
//   alignItems: "center", 
//   backgroundColor: "rgb(48,172,251)", 
//   color: "white", 
//   marginTop: "5px", 
//   borderRadius: "20px", 
//   border: "none", 
//   fontSize: "15pt", 
//   fontWeight: 700, 
//   transition: "1s", 
//   outline: "none", 
//   cursor: "pointer", 
//   marginBottom: "20px",
//   '&:hover':{
//     transform: "scale(1.03)", 
// letterSpacing: "4px", 
// backgroundColor: "#7FFFD4", 
// color: "#1E90FF"
//   }
//   }
// }));

export default function Ball() {
//   const classes = useStyles();

  return (
    <div className="logo" >
        <SportsSoccerIcon />
    </div>
  );
}