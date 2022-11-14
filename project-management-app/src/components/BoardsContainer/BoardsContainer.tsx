import { Grid } from '@mui/material';
import BoardCard from 'components/BoardCard/BoardCard';
import EmptyBoard from '../BoardInfo/EmptyBoard';
import React from 'react';

function BoardsContainer() {
  return (
    <Grid container sx={{ position: 'relative' }}>
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
      <Grid sx={{ padding: '30px' }} item xs={12} md={6} lg={4}>
        <EmptyBoard action={() => console.log('board')} text="Добавить доску" />
      </Grid>
    </Grid>
  );
}

export default BoardsContainer;
