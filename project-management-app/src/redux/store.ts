import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './slices/boardSlice';
import columnsSlice from './slices/columnSlice';
import snackbarSlice from './slices/snackbarSlice';
import userSlice from './slices/userSlice';
import usersSlice from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    columns: columnsSlice,
    board: boardSlice,
    users: usersSlice,
    user: userSlice,
    toast: snackbarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
