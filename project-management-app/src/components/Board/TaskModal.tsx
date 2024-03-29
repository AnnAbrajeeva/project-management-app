import { TextField, FormControl, InputLabel, Select, OutlinedInput, MenuItem } from '@mui/material';
import Modal from 'components/Modal';
import React, { useEffect } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from 'redux/slices/snackbarSlice';
import { AppDispatch, RootState } from 'redux/store';
import { createTask, editTask } from 'redux/thunks';
import { CreateTaskProps, TaskData, TaskModalProps } from 'utils/types';

function TaskModal({ open, handleClose, tasks, board, columnId, task }: TaskModalProps) {
  const users = useSelector((state: RootState) => state.users.users);
  const user = useSelector((state: RootState) => state.user.user);
  const { error, status } = useSelector((state: RootState) => state.columns);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

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
      userId: user!.id,
      users: data.users,
    };

    const updatedTask = {
      title: data.title,
      order: task?.order || tasks.length + 1,
      description: data.description,
      columnId: task?.columnId || '',
      userId: task?.userId || '',
      users: data.users,
    };

    onSubmit({
      boardId: board._id,
      columnId: columnId,
      taskId: task ? task._id : '',
      task: !task ? newTask : updatedTask,
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
  const message = task ? `${t('changed_task')}!` : `${t('created_task')}!`;

  const onSubmit = async (data: CreateTaskProps) => {
    if (task) {
      await dispatch(editTask(data));
    } else {
      await dispatch(createTask(data));
    }
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
      title={task ? t('edit_task') : t('add_task')}
      loading={status}
    >
      <TextField
        error={errors.title ? true : false}
        fullWidth
        required
        margin="dense"
        id="outlined-required"
        label={t('enter_task_name')}
        helperText={errors.title?.message}
        {...register('title', registerOptions.title)}
      />
      <TextField
        error={errors.description ? true : false}
        fullWidth
        required
        margin="dense"
        id="outlined-required"
        label={t('enter_task_descr')}
        helperText={errors.description?.message}
        {...register('description', registerOptions.description)}
      />
      <Controller
        name="users"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <FormControl sx={{ width: '100%', mt: '8px' }}>
            <InputLabel id="users">{t('users')}</InputLabel>
            <Select
              {...field}
              labelId="users"
              label="users"
              multiple
              defaultValue={[]}
              input={<OutlinedInput label={t('users')} />}
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
