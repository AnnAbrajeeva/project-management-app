import React, { useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import BoardsContainer from 'components/BoardsContainer/BoardsContainer';
import BoardsPageHeader from 'components/BoardsPageHeader';
import style from './MainPage.module.scss';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { getFromLocal } from 'utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { setOpen } from 'redux/slices/snackbarSlice';
import { useTranslation } from 'react-i18next';

function MainPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const isAuth = getFromLocal('token');
    if (!isAuth) {
      setOpen({
        open: true,
        message: `${t('expired_token')}`,
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
            <BoardsPageHeader title={t('boards')} />
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
