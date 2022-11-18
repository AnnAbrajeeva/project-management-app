import React from 'react';
import { Container, Paper } from '@mui/material';
import BoardsContainer from 'components/BoardsContainer/BoardsContainer';
import BoardsPageHeader from 'components/BoardsPageHeader';
import style from './MainPage.module.scss';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

function MainPage() {
  return (
    <div className={style.main}>
      <div className={style.wrapper}></div>
      <Paper sx={{ backgroundColor: 'transparent', pt: '20px', pb: '20px' }} elevation={0}>
        <Container sx={{ backgroundColor: 'transparent' }} maxWidth="lg">
          <Container>
            <BoardsPageHeader title={'Boards'} />
          </Container>
          <ErrorBoundary>
            <BoardsContainer />
          </ErrorBoundary>
        </Container>
      </Paper>
    </div>
  );
}

export default MainPage;
