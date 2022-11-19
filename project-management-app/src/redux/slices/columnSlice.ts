import { ColumnState } from '../../utils/types';
import { createColumn } from '../thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ColumnState = {
  column: null,
  status: 'loading',
  error: '',
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
        state.error = '';
      });
  },
});

export const {} = columnSlice.actions;
export default columnSlice.reducer;
