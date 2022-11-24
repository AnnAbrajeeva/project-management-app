import { TaskState } from './../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { createTask } from 'redux/thunks';

const initialState: TaskState = {
  task: null,
  status: 'loading',
  error: '',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      state.status = 'loading';
      state.task = null;
      state.error = '';
    }),
      builder.addCase(createTask.rejected, (state, action) => {
        state.status = 'error';
        state.task = null;
        state.error = action.payload as string;
      }),
      builder.addCase(createTask.fulfilled, (state, action) => {
        state.status = 'success';
        state.task = action.payload;
        state.error = '';
      });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
