import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ConfirmModalProps } from 'utils/types';
import LoadingButton from '@mui/lab/LoadingButton';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmModal({ showConfirm, handleClose, action, title, loading }: ConfirmModalProps) {
  return (
    <Dialog
      open={showConfirm}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleClose}>
          Disagree
        </Button>
        <LoadingButton
          loading={loading === 'loading'}
          variant="contained"
          color="success"
          onClick={action}
        >
          Agree
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
