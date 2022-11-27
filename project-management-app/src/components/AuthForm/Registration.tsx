import React from 'react';
import Input from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import style from './Auth.module.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewUser, RegisterFormData } from 'utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from 'redux/thunks';
import { AppDispatch, RootState } from 'redux/store';
import { setNewUser } from 'redux/slices/userSlice';
import { schemaRegistration } from './validation';
import { setOpen } from 'redux/slices/snackbarSlice';
import { getFromLocal } from 'utils/localStorage';

export const MyInput = styled(Input)({
  fieldset: {
    border: '2px solid rgba(0,26,51,.2)',
    borderRadius: '10px',
    boxShadow: '0 4px 4px rgb(5 56 254 / 25%)',
  },
});

function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);
  const navigate = useNavigate();
  const isAuth = getFromLocal('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schemaRegistration),
    mode: 'onChange',
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data: NewUser) => {
    await dispatch(createUser(data));
    goToLogin(data);
  };

  function goToLogin(data: NewUser) {
    const toastMessage = error ? error : 'Вы успешно зарегистрировались!';
    const toastStyle = error ? 'error' : 'success';
    dispatch(setNewUser(data));
    dispatch(
      setOpen({
        open: true,
        message: toastMessage,
        view: toastStyle,
      })
    );
    setTimeout(() => {
      if (!error) {
        navigate('/login');
      }
    }, 4000);
  }

  const onSubmitHandler = (data: FieldValues) => {
    onSubmit({
      name: data.name,
      login: data.login,
      password: data.password,
    });
    reset();
  };

  const isDisabled = Object.keys(errors).length ? true : false;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={style.login}>
        <MyInput
          variant="outlined"
          error={errors.name ? true : false}
          label="Введите Ваше имя"
          helperText={errors.name?.message}
          {...register('name')}
        />

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

        <MyInput
          variant="outlined"
          error={errors.confirmPassword ? true : false}
          label="Подтвердите пароль"
          helperText={errors.confirmPassword?.message}
          {...register('confirmPassword')}
          type="password"
        />

        <p className={style.text}>
          Уже есть аккаунт? <Link to={'/login'}>Войти</Link>
        </p>
        <LoadingButton
          sx={{ p: '8px', fontSize: '18px' }}
          loading={status === 'loading'}
          variant="contained"
          type="submit"
          disabled={isDisabled}
        >
          Регистрация
        </LoadingButton>
      </form>
    </>
  );
}

export default RegisterForm;
