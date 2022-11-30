import { TasksState } from './../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { createTask, deleteTask, editTask, fetchTasks } from 'redux/thunks';

const initialState: TasksState = {
  task: null,
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
      state.error = '';
    }),
      builder.addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'error';
        state.tasks = [];
        state.error = action.payload as string;
      }),
      builder.addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'success';
        state.tasks = [...state.tasks, ...action.payload];
        state.error = '';
      }),
      builder.addCase(createTask.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      }),
      builder.addCase(createTask.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      }),
      builder.addCase(createTask.fulfilled, (state, action) => {
        state.status = 'success';
        state.tasks = [...state.tasks, action.payload];
        state.error = '';
      }),
      builder.addCase(editTask.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      }),
      builder.addCase(editTask.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      }),
      builder.addCase(editTask.fulfilled, (state, action) => {
        state.status = 'success';
        state.tasks = [
          ...state.tasks.map((task) => (task._id !== action.payload._id ? task : action.payload)),
        ];
        state.error = '';
      }),
      builder.addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      }),
      builder.addCase(deleteTask.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      }),
      builder.addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'success';
        state.tasks = state.tasks.filter((task) => task._id !== action.payload._id);
        state.error = '';
      });
  },
});

export const {} = tasksSlice.actions;
export default tasksSlice.reducer;
