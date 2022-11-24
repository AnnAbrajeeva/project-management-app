import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './slices/boardSlice';
import boardsSlice from './slices/boardsSlice';
import columnsSlice from './slices/columns.slice';
import columnSlice from './slices/columnSlice';
import tasksSlice from './slices/tasksSlice';
import usersSlice from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
    columns: columnsSlice,
    column: columnSlice,
    board: boardSlice,
    tasks: tasksSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
