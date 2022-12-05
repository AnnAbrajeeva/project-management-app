import React from 'react';
import { Container, Paper } from '@mui/material';
import style from './Auth.module.scss';
import RegisterForm from 'components/AuthForm/Registration';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

function AuthPage() {
  const { t } = useTranslation();
  return (
    <div className={style.main}>
      <div className={style.wrapper}></div>
      <Paper
        sx={{
          backgroundColor: 'transparent',
          pt: '20px',
          pb: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80%',
        }}
        elevation={0}
      >
        <Container
          sx={{
            backgroundColor: 'transparent',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          maxWidth="lg"
        >
          <h1 className={style.title}>{t('registration')}</h1>
          <div className={style.formWrapper}>
            <ErrorBoundary>
              <RegisterForm />
            </ErrorBoundary>
          </div>
        </Container>
      </Paper>
    </div>
  );
}

export default AuthPage;
