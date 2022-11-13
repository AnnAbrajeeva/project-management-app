import { Paper, Container } from '@mui/material';
import BoardInfo from 'components/BoardInfo';
import React from 'react';
import style from './BoardPage.module.scss';

function BoardPage() {
  return (
    <div className={style.main}>
      <Paper sx={{ backgroundColor: 'transparent', pt: '20px', pb: '20px' }} elevation={0}>
        <Container sx={{ backgroundColor: 'transparent' }} maxWidth="lg">
          <BoardInfo />
        </Container>
      </Paper>
    </div>
  );
}

export default BoardPage;