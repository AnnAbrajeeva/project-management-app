import React from 'react';
import { Paper } from '@mui/material';
import Board from 'components/Board';
import style from './BoardInfo.module.scss';
import EmptyBoard from './EmptyBoard';
import Modal from 'components/Modal';
import TextField from '@mui/material/TextField';

function BoardInfo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper
      sx={{ backgroundColor: 'transparent', pt: '20px', pb: '20px', position: 'relative' }}
      elevation={0}
    >
      <div className={style.wrapper}>
        <Board />
        <EmptyBoard action={handleClickOpen} text="Добавить колонку" />
      </div>
      <Modal open={open} handleClose={handleClose} title="Добавить колонку">
        {<AddColumnForm />}
      </Modal>
    </Paper>
  );
}

export default BoardInfo;

const AddColumnForm = () => {
  return (
    <form action="">
      <TextField
        fullWidth
        required
        margin="dense"
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
      />
    </form>
  );
};
