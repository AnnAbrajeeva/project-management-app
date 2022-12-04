import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { TaskDescrModalProps } from 'utils/types';
import CloseIcon from '@mui/icons-material/Close';
import style from './TaskDescr.module.scss';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TaskDescrModal({ task, open, handleClose }: TaskDescrModalProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className={style.wrapper}>
        <DialogTitle>
          <p className={style.title}>Task: {task.title}</p>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <h3>Исполнители:</h3>
            <ol className={style.list}>
              {task.users &&
                task.users.length > 0 &&
                task.users.map((user, i) => {
                  return <li key={i}>{user}</li>;
                })}
            </ol>
          </div>
          <div>
            <h3>Описание:</h3>
            <p>{task.description}</p>
          </div>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default TaskDescrModal;
