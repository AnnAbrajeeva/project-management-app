import React from 'react';
import { Container, Paper } from '@mui/material';
import BoardsContainer from 'components/BoardsContainer/BoardsContainer';
import BoardsPageHeader from 'components/BoardsPageHeader';
import style from './MainPage.module.scss';

function MainPage() {
  return (
    <div className={style.main}>
      <Paper sx={{ backgroundColor: 'transparent', pt: '20px', pb: '20px' }} elevation={0}>
        <Container sx={{ backgroundColor: 'transparent' }} maxWidth="lg">
          <Container>
            <BoardsPageHeader />
          </Container>
          <BoardsContainer />
        </Container>
      </Paper>
    </div>
  );
}

export default MainPage;
