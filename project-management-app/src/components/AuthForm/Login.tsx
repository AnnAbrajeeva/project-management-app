import React from 'react';
import Input from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import style from './Auth.module.scss';
import { Link } from 'react-router-dom';

export const MyInput = styled(Input)({
  fieldset: {
    border: '2px solid rgba(0,26,51,.2)',
    borderRadius: '10px',
    boxShadow: '0 4px 4px rgb(5 56 254 / 25%)',
  },
});

export function LoginForm() {
  return (
    <form className={style.login}>
      <MyInput
        variant="outlined"
        error={false}
        label="Введите Ваш логин"
        helperText="Incorrect entry."
      />

      <MyInput
        variant="outlined"
        error={false}
        label="Введите Ваш пароль"
        helperText="Incorrect entry."
      />

      <p className={style.text}>
        Еще нет аккаунта? <Link to={'/sign-up'}>Регистрация</Link>
      </p>
      <LoadingButton
        sx={{ p: '8px', fontSize: '18px' }}
        loading={false}
        loadingPosition="end"
        variant="contained"
      >
        Войти
      </LoadingButton>
    </form>
  );
}
