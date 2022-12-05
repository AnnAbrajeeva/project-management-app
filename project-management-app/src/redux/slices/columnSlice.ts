import { Column, ColumnsState, Task } from '../../utils/types';
import {
  createColumn,
  createTask,
  deleteColumn,
  deleteTask,
  editTask,
  fetchColumnsById,
  fetchTasks,
  updateColumn,
  updateColumnOrder,
  updateOrderTask,
} from '../thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ColumnsState = {
  columns: [],
  column: null,
  status: 'success',
  error: '',
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchColumnsById.pending, (state) => {
      state.status = 'loading';
      state.columns = [];
      state.error = '';
    }),
      builder.addCase(fetchColumnsById.rejected, (state, action) => {
        state.status = 'error';
        state.columns = [];
        state.error = action.payload as string;
      }),
      builder.addCase(fetchColumnsById.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.status = 'success';
        state.error = '';
      }),
      builder.addCase(createColumn.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      }),
      builder.addCase(createColumn.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      }),
      builder.addCase(createColumn.fulfilled, (state, action) => {
        state.status = 'success';
        state.columns = [...state.columns, { ...action.payload, tasks: [] }];
        state.error = '';
      }),
      builder.addCase(deleteColumn.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      }),
      builder.addCase(deleteColumn.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      }),
      builder.addCase(deleteColumn.fulfilled, (state, action) => {
        state.status = 'success';
        state.columns = state.columns.filter((column) => column._id !== action.payload._id);
        state.error = '';
      }),
      builder.addCase(updateColumn.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      }),
      builder.addCase(updateColumn.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      }),
      builder.addCase(updateColumn.fulfilled, (state, action) => {
        state.status = 'success';
        const columnIndex = state.columns.findIndex((column) => column._id === action.payload._id);
        state.columns[columnIndex].title = action.payload.title;
        state.error = '';
      }),
      builder.addCase(updateColumnOrder.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      }),
      builder.addCase(updateColumnOrder.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      }),
      builder.addCase(updateColumnOrder.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = '';
        state.columns = action.payload;
      }),
      builder.addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      }),
      builder.addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      }),
      builder.addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'success';
        const tasksArr: Task[] = [...action.payload];
        tasksArr.forEach((tasks: Task) => {
          const index = state.columns.findIndex((column) => {
            return column._id === tasks.columnId;
          });
          state.columns[index] = {
            ...state.columns[index],
            tasks: action.payload,
          };
        });
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
        const columnIndex = state.columns.findIndex(
          (column) => column._id === action.payload.columnId
        );
        state.columns[columnIndex].tasks = state.columns[columnIndex].tasks
          ? [...state.columns[columnIndex].tasks!, { ...action.payload }]
          : [{ ...action.payload }];
        state.error = '';
        state.status = 'success';
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
        const columnIndex = state.columns.findIndex(
          (column) => column._id === action.payload.columnId
        );

        const taskIndex = state.columns[columnIndex].tasks?.findIndex(
          (task) => task._id === action.payload._id
        );

        state.columns[columnIndex].tasks?.splice(taskIndex!, 1);
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
        const columnIndex = state.columns.findIndex(
          (column) => column._id === action.payload.columnId
        );

        const taskIndex = state.columns[columnIndex].tasks?.findIndex(
          (task) => task._id === action.payload._id
        );

        state.columns[columnIndex].tasks![taskIndex!] = {
          ...state.columns[columnIndex].tasks![taskIndex!],
          ...action.payload,
        };
        state.error = '';
      }),
      builder.addCase(updateOrderTask.pending, (state) => {
        // state.status = 'loading';
        state.error = '';
      }),
      builder.addCase(updateOrderTask.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      }),
      builder.addCase(updateOrderTask.fulfilled, (state, action) => {
        const columnIndex = state.columns.findIndex(
          (column) => column._id === action.payload.columnId
        );
        state.columns[columnIndex].tasks = [...action.payload.tasks];
        state.status = 'success';
        state.error = '';
      });
  },
});

export const {} = columnsSlice.actions;
export default columnsSlice.reducer;
