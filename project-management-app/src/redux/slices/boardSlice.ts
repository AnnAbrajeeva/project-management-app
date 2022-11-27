import { BoardState } from '../../utils/types';
import { createBoard, deleteBoard, fetchBoardById, fetchBoards } from '../thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: BoardState = {
  boards: [],
  board: null,
  status: 'loading',
  error: '',
  modal: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setModal(state, action) {
      state.modal = action.payload;
    },
  },
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
      }),
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
      builder.addCase(createBoard.fulfilled, (state, action) => {
        state.boards = [...state.boards, action.payload];
        state.status = 'success';
        state.error = '';
      }),
      builder.addCase(deleteBoard.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      }),
      builder.addCase(deleteBoard.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      }),
      builder.addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter((board) => board._id !== action.payload._id);
        state.status = 'success';
        state.error = '';
      });
  },
});

export const { setModal } = boardSlice.actions;
export default boardSlice.reducer;
