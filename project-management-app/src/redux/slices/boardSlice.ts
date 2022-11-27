import { BoardState } from '../../utils/types';
import { createBoard, fetchBoardById } from '../thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: BoardState = {
  board: null,
  status: 'loading',
  error: '',
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoardById.pending, (state) => {
      state.status = 'loading';
      state.board = null;
      state.error = '';
    }),
      builder.addCase(fetchBoardById.rejected, (state, action) => {
        state.status = 'error';
        state.board = null;
        state.error = action.payload as string;
      }),
      builder.addCase(fetchBoardById.fulfilled, (state, action) => {
        state.board = action.payload;
        state.status = 'success';
        state.error = '';
      }),
      builder.addCase(createBoard.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      }),
      builder.addCase(createBoard.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      }),
      builder.addCase(createBoard.fulfilled, (state) => {
        state.status = 'success';
        state.error = '';
      });
  },
});

export const {} = boardSlice.actions;
export default boardSlice.reducer;
