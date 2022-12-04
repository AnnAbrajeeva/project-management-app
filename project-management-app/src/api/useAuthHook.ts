import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export function useAuth() {
  const { token, user } = useSelector((state: RootState) => state.user);

  return {
    isAuth: !!token,
    user,
  };
}
