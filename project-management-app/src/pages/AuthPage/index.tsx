import React from 'react';
import { Container, Paper } from '@mui/material';
import style from './Auth.module.scss';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import LoginForm from 'components/AuthForm/Login';
import RegisterForm from 'components/AuthForm/Registration';

function AuthPage() {
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
          <h1 className={style.title}>Регистрация</h1>
          <div className={style.formWrapper}>
            <RegisterForm />
          </div>
        </Container>
      </Paper>
    </div>
  );
}

export default AuthPage;
