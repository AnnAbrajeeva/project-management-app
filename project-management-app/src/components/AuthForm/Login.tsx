import React, { useEffect } from 'react';
import Input from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import style from './Auth.module.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { RegisterFormData, UserLogin } from 'utils/types';
import { loginUser } from 'redux/thunks';
import { removeNewUser, setUserParams } from 'redux/slices/userSlice';
import { schemaLogin } from './validation';
import { setOpen } from 'redux/slices/snackbarSlice';
import { getUserParams } from 'utils/getUserParams';
import { getFromLocal, setToLocalStorage } from 'utils/localStorage';

export const MyInput = styled(Input)({
  fieldset: {
    border: '2px solid rgba(0,26,51,.2)',
    borderRadius: '10px',
    boxShadow: '0 4px 4px rgb(5 56 254 / 25%)',
  },
});

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { newUser, error, status, token } = useSelector((state: RootState) => state.user);
  const isAuth = getFromLocal('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schemaLogin),
    mode: 'onChange',
    defaultValues: {
      login: newUser?.login || '',
      password: newUser?.password || '',
    },
  });

  useEffect(() => {
    if (status === 'error') {
      dispatch(
        setOpen({
          open: true,
          message: error,
          view: 'error',
        })
      );
    } else if (status === 'success' && token) {
      reset();
      setToLocalStorage('token', token);
      const user = getUserParams();
      setToLocalStorage('user', user);
      dispatch(setUserParams(user));
      dispatch(removeNewUser());
      navigate('/');
    }
  }, [status, token]);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data: UserLogin) => {
    await dispatch(loginUser(data));
  };

  const onSubmitHandler = (data: FieldValues) => {
    onSubmit({
      login: data.login,
      password: data.password,
    });
  };

  const isDisabled = Object.keys(errors).length ? true : false;

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={style.login}>
      <MyInput
        variant="outlined"
        label="Введите Ваш логин"
        error={errors.login ? true : false}
        helperText={errors.login?.message}
        {...register('login')}
      />

      <MyInput
        variant="outlined"
        label="Введите Ваш пароль"
        error={errors.password ? true : false}
        helperText={errors.password?.message}
        {...register('password')}
        type="password"
      />

      <p className={style.text}>
        Еще нет аккаунта? <Link to={'/registration'}>Регистрация</Link>
      </p>
      <LoadingButton
        sx={{ p: '8px', fontSize: '18px' }}
        loading={status === 'loading'}
        variant="contained"
        type="submit"
        disabled={isDisabled}
      >
        Войти
      </LoadingButton>
    </form>
  );
}

export default LoginForm;
