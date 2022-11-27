import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './slices/boardSlice';
import columnsSlice from './slices/columns.slice';
import columnSlice from './slices/columnSlice';
import snackbarSlice from './slices/snackbarSlice';
import tasksSlice from './slices/tasksSlice';
import userSlice from './slices/userSlice';
import usersSlice from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    columns: columnsSlice,
    column: columnSlice,
    board: boardSlice,
    tasks: tasksSlice,
    users: usersSlice,
    user: userSlice,
    toast: snackbarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
