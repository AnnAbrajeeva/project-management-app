import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material';
import Modal from 'components/Modal';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { TaskModalProps } from 'utils/types';

function TaskModal({
  open,
  handleClose,
  formSubmit,
  handleSubmit,
  register,
  errors,
  control,
}: TaskModalProps) {
  const users = useSelector((state: RootState) => state.users.users);

  const registerOptions = {
    title: {
      required: 'Title is required',
      minLength: { value: 2, message: 'Name must have at least 2 characters' },
      value: '',
    },
    description: {
      required: 'Description is required',
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
      title="Добавить таск"
    >
      <TextField
        error={errors.title ? true : false}
        fullWidth
        required
        margin="dense"
        id="outlined-required"
        label="Введите название таска"
        helperText={errors.title?.message}
        {...register('title', registerOptions.title)}
      />
      <TextField
        error={errors.description ? true : false}
        fullWidth
        required
        margin="dense"
        id="outlined-required"
        label="Введите описание таска"
        helperText={errors.description?.message}
        {...register('description', registerOptions.description)}
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
}

export default TaskModal;
