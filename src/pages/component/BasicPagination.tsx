import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
      display:'flex',
      justifyContent:'center',
      margin:'20px',
      

    
    },

  }),
);

export default function BasicPagination() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(page)
  };
  return (

    <Grid item xs={12} spacing={3}>
    <div className={classes.root}>
{page}
<Pagination count={10} color="primary" showFirstButton  onChange={handleChange} />

</div>
      </Grid>


  );
}
