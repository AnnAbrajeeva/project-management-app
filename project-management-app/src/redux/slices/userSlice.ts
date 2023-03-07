import { UserState } from './../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser } from 'redux/thunks';
import { getFromLocal } from 'utils/localStorage';

const initialState: UserState = {
  user: getFromLocal('user') || null,
  status: '',
  error: '',
  newUser: null,
  token: getFromLocal('token') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNewUser(state, action) {
      state.newUser = action.payload;
    },
    removeNewUser(state) {
      state.newUser = null;
    },
    setUserParams(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
      state.token = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.status = 'loading';
      state.newUser = null;
      state.error = '';
    }),
      builder.addCase(createUser.rejected, (state, action) => {
        state.status = 'error';
        state.newUser = null;
        state.error = action.payload as string;
      }),
      builder.addCase(createUser.fulfilled, (state) => {
        state.status = 'success';
        state.error = '';
      }),
      builder.addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.user = null;
        state.error = '';
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        state.user = null;
        state.error = action.payload;
      }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = '';
        state.token = action.payload.token;
      });
  },
});

export const { setNewUser, removeNewUser, setUserParams, removeUser } = userSlice.actions;
export default userSlice.reducer;
