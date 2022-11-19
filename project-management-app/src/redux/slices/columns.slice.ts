import { ColumnsState } from '../../utils/types';
import { fetchColumnsById } from '../thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ColumnsState = {
  columns: [],
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
      });
  },
});

export const {} = columnsSlice.actions;
export default columnsSlice.reducer;
