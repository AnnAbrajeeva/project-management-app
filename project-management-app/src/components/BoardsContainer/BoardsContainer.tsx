import { Grid } from '@mui/material';
import BoardCard from 'components/BoardCard/BoardCard';
import React from 'react';

function BoardsContainer() {
  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={4}>
        <BoardCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <BoardCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <BoardCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <BoardCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <BoardCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <BoardCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <BoardCard />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <BoardCard />
      </Grid>
    </Grid>
  );
}

export default BoardsContainer;
