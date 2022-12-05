import { UsersState } from './../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, getUser, getUsers, updateUser } from 'redux/thunks';

const initialState: UsersState = {
  users: [],
  user: null,
  status: 'loading',
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.status = 'loading';
      state.users = [];
      state.error = '';
    }),
      builder.addCase(getUsers.rejected, (state, action) => {
        state.status = 'error';
        state.users = [];
        state.error = action.payload as string;
      }),
      builder.addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'success';
        state.users = action.payload;
        state.error = '';
      }),
      builder.addCase(getUser.pending, (state) => {
        state.status = 'loading';
        state.user = null;
        state.error = '';
      }),
      builder.addCase(getUser.rejected, (state, action) => {
        state.status = 'error';
        state.user = null;
        state.error = action.payload as string;
      }),
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
        state.error = '';
      }),
      builder.addCase(updateUser.pending, (state) => {
        state.status = 'loading';
        state.user = {
          name: '',
          login: '',
          _id: '',
        };
        state.error = '';
      }),
      builder.addCase(updateUser.rejected, (state, action) => {
        state.status = 'error';
        state.user = null;
        state.error = action.payload as string;
      }),
      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
        state.error = '';
      }),
      builder.addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
        state.user = state.user = {
          name: '',
          login: '',
          _id: '',
        };
        state.error = '';
      }),
      builder.addCase(deleteUser.rejected, (state, action) => {
        state.status = 'error';
        state.user = null;
        state.error = action.payload as string;
      }),
      builder.addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = '';
      });
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
