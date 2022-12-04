import { TextField } from '@mui/material';
import Modal from 'components/Modal';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ColumnData, ColumnModalProps, CreateColumnProps } from 'utils/types';
import { createColumn } from 'redux/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from 'redux/slices/snackbarSlice';
import { AppDispatch, RootState } from 'redux/store';

function ColumnModal({ open, handleClose }: ColumnModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector((state: RootState) => state.board.board);
  const { columns, status, error } = useSelector((state: RootState) => state.columns);

  const onSubmit = async (data: CreateColumnProps) => {
    await dispatch(createColumn(data));
    if (status === 'error') {
      dispatch(
        setOpen({
          open: true,
          message: error,
          view: 'error',
        })
      );
    }
    if (status === 'success') {
      dispatch(
        setOpen({
          open: true,
          message: 'Колонка успешно создана!',
          view: 'success',
        })
      );
      reset();
      handleClose();
    }
  };

  const formSubmit: SubmitHandler<FieldValues> = (data) => {
    if (board) {
      onSubmit({
        id: board?._id,
        title: data.title,
        order: columns.length + 1,
      });
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
    <Modal
      open={open}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      formSubmit={formSubmit}
      title="Добавить колонку"
      loading={status}
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
  );
}

export default ColumnModal;
