import React from 'react';
import { Paper } from '@mui/material';
import Board from 'components/Board';
import style from './BoardInfo.module.scss';
import EmptyBoard from './EmptyBoard';
import Modal from 'components/Modal';
import TextField from '@mui/material/TextField';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ColumnData, CreateColumnProps } from 'utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { createColumn } from 'redux/thunks';
import { AppDispatch, RootState } from 'redux/store';

function BoardInfo() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector((state: RootState) => state.board.board);
  const columns = useSelector((state: RootState) => state.columns.columns);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: CreateColumnProps) => {
    dispatch(createColumn(data));
  };

  const formSubmit: SubmitHandler<FieldValues> = (data) => {
    if (board) {
      onSubmit({
        id: board?._id,
        title: data.title,
        order: columns.length + 1,
      });
      reset();
      setOpen(false);
    }
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<ColumnData>({
    defaultValues: {
      title: '',
    },
    mode: 'onChange',
  });

  const registerOptions = {
    title: {
      required: 'Title is required',
      minLength: { value: 2, message: 'Name must have at least 2 characters' },
      value: '',
    },
  };

  return (
    <Paper
      sx={{ backgroundColor: 'transparent', pt: '20px', pb: '20px', position: 'relative' }}
      elevation={0}
    >
      <div className={style.wrapper}>
        {columns.map((column) => {
          return <Board column={column} key={column._id} />;
        })}

        <EmptyBoard action={handleClickOpen} text="Добавить колонку" />
      </div>
      <Modal
        open={open}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        formSubmit={formSubmit}
        title="Добавить колонку"
      >
        <TextField
          error={errors.title ? true : false}
          fullWidth
          required
          margin="dense"
          id="outlined-required"
          label="Введите название колонки"
          helperText={errors.title?.message}
          {...register('title', registerOptions.title)}
        />
      </Modal>
    </Paper>
  );
}

export default BoardInfo;
