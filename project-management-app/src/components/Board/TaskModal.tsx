import { TextField, FormControl, InputLabel, Select, OutlinedInput, MenuItem } from '@mui/material';
import Modal from 'components/Modal';
import React, { useEffect } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from 'redux/slices/snackbarSlice';
import { AppDispatch, RootState } from 'redux/store';
import { createTask } from 'redux/thunks';
import { CreateTaskProps, TaskData, TaskModalProps } from 'utils/types';

function TaskModal({ open, handleClose, tasks, board, columnId, task }: TaskModalProps) {
  const users = useSelector((state: RootState) => state.users.users);
  const { error, status } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const defaultValues: { title: string; description: string; users: string[] } = {
      title: '',
      description: '',
      users: [],
    };
    if (task) {
      defaultValues.title = task.title;
      defaultValues.description = task.description;
      defaultValues.users = task.users;
    }
    reset({ ...defaultValues });
  }, [task]);

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
    users: {
      required: 'Responsible is required',
    },
  };

  const formSubmit: SubmitHandler<FieldValues> = (data) => {
    const newTask = {
      title: data.title,
      order: tasks.length + 1,
      description: data.description,
      userId: 1,
      users: data.users,
    };
    onSubmit({
      boardId: board._id,
      columnId: columnId,
      task: newTask,
    });
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    control,
  } = useForm<TaskData>({
    defaultValues: {
      title: '',
      description: '',
      users: [],
    },
    mode: 'onChange',
  });

  const responsibles = board.users.length ? board.users : users;
  const message = task ? 'Таск изменён!' : 'Таск успешно создан!';

  const onSubmit = (data: CreateTaskProps) => {
    dispatch(createTask(data));
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
          message: message,
          view: 'success',
        })
      );
    }
  };

  return (
    <Modal
      open={open}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      formSubmit={formSubmit}
      title={task ? 'Редактировать таск' : 'Добавить таск'}
      loading={status}
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
              {responsibles.map((user, i) => (
                <MenuItem
                  value={typeof user === 'string' ? user : user.name}
                  key={typeof user === 'string' ? i : user._id}
                >
                  {typeof user === 'string' ? user : user.name}
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
