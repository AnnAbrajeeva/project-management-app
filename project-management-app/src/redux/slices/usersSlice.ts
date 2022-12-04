import { UsersState } from './../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from 'redux/thunks';

const initialState: UsersState = {
  users: [],
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
      });
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
