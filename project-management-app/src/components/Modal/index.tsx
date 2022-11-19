import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import style from './Modal.module.scss';
import { ModalProps } from 'utils/types';

function Modal({ open, children, handleClose, title, formSubmit, handleSubmit }: ModalProps) {
  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
      <div onClick={handleClose} className={style.close}>
        <CloseIcon />
      </div>
      <form>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={handleSubmit(formSubmit)}>
            Добавить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default Modal;
