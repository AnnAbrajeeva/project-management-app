import React from 'react';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import Modal from 'components/Modal';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { BoardData, CreateBoardProps } from 'utils/types';
import { setModal } from 'redux/slices/boardSlice';
import { createBoard } from 'redux/thunks';

const BoardModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const user = useSelector((state: RootState) => state.user.user);
  const openModal = useSelector((state: RootState) => state.board.modal);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    control,
  } = useForm<BoardData>({
    defaultValues: {
      title: '',
      users: [],
    },
    mode: 'onChange',
  });

  function handleClose() {
    dispatch(setModal(false));
  }

  const registerOptions = {
    title: {
      required: 'Title is required',
      minLength: { value: 2, message: 'Name must have at least 2 characters' },
      value: '',
    },
  };

  const onSubmit = (data: CreateBoardProps) => {
    dispatch(createBoard(data));
  };

  const formSubmit: SubmitHandler<FieldValues> = (data) => {
    if (user) {
      onSubmit({
        title: data.title,
        owner: user?.id,
        users: data.users,
      });
      reset();
      dispatch(setModal(false));
    }
  };

  return (
    <Modal
      open={openModal}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      formSubmit={formSubmit}
      title="Добавить доску"
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
