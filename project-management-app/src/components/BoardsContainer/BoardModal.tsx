import React, { useEffect, useMemo } from 'react';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import Modal from 'components/Modal';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { BoardData, CreateBoardProps, BoardModalProps } from 'utils/types';
import { setEditBoard, setModal } from 'redux/slices/boardSlice';
import { createBoard, updateBoard } from 'redux/thunks';
import { setOpen } from 'redux/slices/snackbarSlice';

const BoardModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const user = useSelector((state: RootState) => state.user.user);
  const { modal, editBoard, status, error } = useSelector((state: RootState) => state.board);

  useEffect(() => {
    const defaultValues: { title: string; users: string[] } = {
      title: '',
      users: [],
    };
    if (editBoard) {
      defaultValues.title = editBoard.title;
      defaultValues.users = editBoard.users;
    }

    reset({ ...defaultValues });
  }, [editBoard]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    control,
  } = useForm<BoardData>({
    defaultValues: editBoard || {},
    mode: 'onChange',
  });

  function handleClose() {
    dispatch(setModal(false));
    if (editBoard) {
      reset();
      dispatch(setEditBoard(null));
    }
  }

  const registerOptions = {
    title: {
      required: 'Title is required',
      minLength: { value: 2, message: 'Title must have at least 2 characters' },
      value: '',
    },
  };

  const onSubmit = (data: CreateBoardProps) => {
    if (!editBoard) {
      dispatch(createBoard(data));
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
        reset();
        handleClose();
        dispatch(
          setOpen({
            open: true,
            message: 'Доска успешно создана!',
            view: 'success',
          })
        );
      }
    } else {
      const newData = {
        board: data,
        id: editBoard._id,
      };
      dispatch(updateBoard(newData));
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
        reset();
        handleClose();
        dispatch(
          setOpen({
            open: true,
            message: 'Доска обновлена!',
            view: 'success',
          })
        );
      }
    }
  };

  const formSubmit: SubmitHandler<FieldValues> = (data) => {
    if (user) {
      onSubmit({
        title: data.title,
        owner: user.id,
        users: data.users,
      });
      reset();
      dispatch(setModal(false));
    }
  };

  return (
    <Modal
      open={modal}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      formSubmit={formSubmit}
      title="Добавить доску"
      loading={status}
    >
      <TextField
        fullWidth
        required
        margin="dense"
        id="outlined-required"
        label="Введите название доски"
        helperText={errors.title?.message}
        {...register('title', registerOptions.title)}
        error={errors.title ? true : false}
      />
      <Controller
        name="users"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormControl sx={{ width: '100%', mt: '8px' }}>
            <InputLabel id="users">Участники</InputLabel>
            <Select
              {...field}
              labelId="users"
              label="users"
              multiple
              defaultValue={[]}
              input={<OutlinedInput label="Участники" />}
            >
              {users.map((user) => (
                <MenuItem value={user.name} key={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Modal>
  );
};

export default BoardModal;
