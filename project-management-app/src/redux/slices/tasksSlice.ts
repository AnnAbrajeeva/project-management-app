import { Task, TaskOrderProps, TasksState } from './../../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTask, deleteTask, editTask, fetchTasks, updateOrderTask } from 'redux/thunks';

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
    // builder.addCase(fetchTasks.pending, (state) => {
    //   state.status = 'loading';
    //   state.error = '';
    // }),
    //   builder.addCase(fetchTasks.rejected, (state, action) => {
    //     state.status = 'error';
    //     state.tasks = [];
    //     state.error = action.payload as string;
    //   }),
    //   builder.addCase(fetchTasks.fulfilled, (state, action) => {
    //     state.status = 'success';
    //     console.log(action.payload);
    //     // const arr = action.payload.map((item) => item.flat());
    //     // console.log(arr);
    //     // state.tasks = arr.map((col) => col.sort((a, b) => a.order - b.order));
    //     state.error = '';
    //   }),
    // builder.addCase(createTask.pending, (state) => {
    //   state.status = 'loading';
    //   state.error = '';
    // }),
    //   builder.addCase(createTask.rejected, (state, action) => {
    //     state.status = 'error';
    //     state.error = action.payload as string;
    //   }),
    //   builder.addCase(createTask.fulfilled, (state, action) => {
    //     state.status = 'success';
    //     state.tasks = [...state.tasks, action.payload];
    //     state.error = '';
    //   }),
    // builder.addCase(editTask.pending, (state) => {
    //   state.status = 'loading';
    //   state.error = '';
    // }),
    //   builder.addCase(editTask.rejected, (state, action) => {
    //     state.status = 'error';
    //     state.error = action.payload as string;
    //   }),
    //   builder.addCase(editTask.fulfilled, (state, action) => {
    //     state.status = 'success';
    //     // const columnIndex = state.tasks.findIndex((column) => column.columnId === action.payload);
    //     // const taskIndex = state.tasks[columnIndex].tasks.findIndex(
    //     //   (task) => task._id === action.payload._id
    //     // );
    //     // state.tasks[columnIndex].tasks[taskIndex] = {
    //     //   ...state.tasks[columnIndex].tasks[taskIndex],
    //     //   ...action.payload.task,
    //     // };
    //     state.error = '';
    //   }),
    // builder.addCase(updateOrderTask.pending, (state) => {
    //   state.status = 'loading';
    //   state.error = '';
    // }),
    //   builder.addCase(updateOrderTask.rejected, (state, action) => {
    //     state.status = 'error';
    //     state.error = action.payload as string;
    //   }),
    //   builder.addCase(updateOrderTask.fulfilled, (state, action) => {
    //     state.status = 'success';
    //     state.error = '';
    //   });
    // builder.addCase(deleteTask.pending, (state) => {
    //   state.status = 'loading';
    //   state.error = '';
    // }),
    // builder.addCase(deleteTask.rejected, (state, action) => {
    //   state.status = 'error';
    //   state.error = action.payload as string;
    // }),
    // builder.addCase(deleteTask.fulfilled, (state, action) => {
    //   state.status = 'success';
    //   // const columnIndex = state.tasks.findIndex((column) => column.columnId === action.payload);
    //   // const taskIndex = state.tasks[columnIndex].tasks.findIndex(
    //   //   (task) => task._id === action.payload._id
    //   // );
    //   // state.tasks[columnIndex].tasks.splice(taskIndex, 1);
    //   state.error = '';
    // });
  },
});

export const {} = tasksSlice.actions;
export default tasksSlice.reducer;
