import { TasksState } from './../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks } from 'redux/thunks';

const initialState: TasksState = {
  tasks: [],
  status: 'loading',
  error: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = 'loading';
      state.tasks = [];
      state.error = '';
    }),
      builder.addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'error';
        state.tasks = [];
        state.error = action.payload as string;
      }),
      builder.addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'success';
        state.tasks = action.payload;
        state.error = '';
      });
  },
});

export const {} = tasksSlice.actions;
export default tasksSlice.reducer;
