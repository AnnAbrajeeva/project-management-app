import React, { useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import BoardsContainer from 'components/BoardsContainer/BoardsContainer';
import BoardsPageHeader from 'components/BoardsPageHeader';
import style from './MainPage.module.scss';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { getFromLocal } from 'utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { setOpen } from 'redux/slices/snackbarSlice';

function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = getFromLocal('token');
    if (!isAuth) {
      setOpen({
        open: true,
        message: 'Время действия токена истекло.',
        view: 'error',
      });
      navigate('/welcome');
    }
  }, []);

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
