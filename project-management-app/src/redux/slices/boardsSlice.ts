import { BoardsState } from './../../utils/types';
import { fetchBoards } from './../thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: BoardsState = {
  boards: [],
  status: 'loading',
  error: '',
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.status = 'loading';
      state.boards = [];
      state.error = '';
    }),
      builder.addCase(fetchBoards.rejected, (state, action) => {
        state.status = 'error';
        state.boards = [];
        state.error = action.payload as string;
      }),
      builder.addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.status = 'success';
        state.error = '';
      });
  },
});

export const {} = boardsSlice.actions;
export default boardsSlice.reducer;
