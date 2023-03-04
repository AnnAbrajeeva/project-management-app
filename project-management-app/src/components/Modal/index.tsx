import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import style from './Modal.module.scss';
import { ModalProps } from 'utils/types';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';

function Modal({
  open,
  children,
  handleClose,
  title,
  formSubmit,
  handleSubmit,
  loading,
}: ModalProps) {
  const { t } = useTranslation();
  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
      <div onClick={handleClose} className={style.close}>
        <CloseIcon />
      </div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={handleSubmit(formSubmit)}
            color="success"
            loading={loading === 'loading'}
            variant="contained"
          >
            {t('add')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default Modal;
