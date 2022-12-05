import { SnackbarState } from './../../utils/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: SnackbarState = {
  toast: {
    open: false,
    message: '',
    view: 'success',
  },
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setOpen(state, action) {
      state.toast = action.payload;
    },
    setClose(state) {
      state.toast = {
        open: false,
        message: '',
        view: 'success',
      };
    },
  },
});

export const { setOpen, setClose } = snackbarSlice.actions;
export default snackbarSlice.reducer;
