import React, { useEffect } from 'react';
import Input from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import style from './ProfileForm.module.scss';
import { Navigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewUser, ProfileUserProps } from 'utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'redux/thunks';
import { AppDispatch, RootState } from 'redux/store';
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

function ProfileForm({ user }: ProfileUserProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.users);
  const isAuth = getFromLocal('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewUser>({
    resolver: yupResolver(schemaRegistration),
    mode: 'onChange',
  });

  useEffect(() => {
    const defaultValues = {
      name: '',
      login: '',
      password: '',
    };
    defaultValues.name = user.name;
    defaultValues.login = user.login;
    defaultValues.password = '';
    reset({ ...defaultValues });
  }, [user, reset]);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data: NewUser) => {
    if (user) {
      await dispatch(
        updateUser({
          id: user._id,
          user: data,
        })
      );
      showToast();
      reset();
    }
  };

  function showToast() {
    const toastMessage = error ? error : 'Профиль изменён';
    const toastStyle = error ? 'error' : 'success';
    dispatch(
      setOpen({
        open: true,
        message: toastMessage,
        view: toastStyle,
      })
    );
  }

  const onSubmitHandler = (data: FieldValues) => {
    onSubmit({
      name: data.name,
      login: data.login,
      password: data.password,
    });
  };

  const isDisabled = Object.keys(errors).length ? true : false;

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={style.login}>
      <MyInput
        variant="outlined"
        error={errors.name ? true : false}
        label="Введите новое имя"
        helperText={errors.name?.message}
        {...register('name')}
      />

      <MyInput
        variant="outlined"
        label="Введите новый логин"
        error={errors.login ? true : false}
        helperText={errors.login?.message}
        {...register('login')}
      />

      <MyInput
        variant="outlined"
        label="Введите новый пароль"
        error={errors.password ? true : false}
        helperText={errors.password?.message}
        {...register('password')}
        type="password"
      />

      <LoadingButton
        sx={{ p: '8px', fontSize: '18px' }}
        loading={status === 'loading'}
        variant="contained"
        type="submit"
        disabled={isDisabled}
      >
        Изменить
      </LoadingButton>
    </form>
  );
}

export default ProfileForm;
