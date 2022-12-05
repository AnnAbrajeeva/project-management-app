import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClose } from 'redux/slices/snackbarSlice';
import { RootState } from 'redux/store';

function Toast() {
  const toast = useSelector((state: RootState) => state.toast.toast);
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setClose());
  };

  return (
    <Snackbar
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={toast.open}
      autoHideDuration={3000}
    >
      <Alert onClose={handleClose} severity={toast.view}>
        {toast.message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
