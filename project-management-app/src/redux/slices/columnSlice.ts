import { ColumnsState } from '../../utils/types';
import { createColumn, deleteColumn, fetchColumnsById, updateColumn } from '../thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ColumnsState = {
  columns: [],
  column: null,
  status: 'loading',
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
        state.columns = [...state.columns, action.payload];
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
        state.columns = state.columns.map((column) =>
          column._id !== action.payload._id ? column : action.payload
        );
        state.error = '';
      });
  },
});

export const {} = columnsSlice.actions;
export default columnsSlice.reducer;
