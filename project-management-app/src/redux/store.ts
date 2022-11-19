import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './slices/boardSlice';
import boardsSlice from './slices/boardsSlice';
import columnsSlice from './slices/columns.slice';
import columnSlice from './slices/columnSlice';

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
    columns: columnsSlice,
    column: columnSlice,
    board: boardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
