import React, { useEffect, useState } from 'react';
import BoardTask from 'components/BoardTask';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import style from './Board.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Tooltip, TextField } from '@mui/material';
import { ColumnProps, CreateTaskProps, TaskData } from 'utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateColumn } from 'redux/thunks';
import { AppDispatch, RootState } from 'redux/store';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import TaskModal from './TaskModal';

function Board({ column }: ColumnProps) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector((state: RootState) => state.board.board);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    if (board?._id) {
      dispatch(fetchTasks({ id: board?._id, columnId: column._id }));
    }
  }, [dispatch, board?._id, column._id]);

  const error = title ? false : true;

  function changeTitle() {
    if (board && title) {
      const newColumn = {
        boardId: board?._id,
        columnId: column._id,
        title: title,
        order: column.order,
      };
      dispatch(updateColumn(newColumn));
      setEdit(false);
    }
  }

  function cancelEdit() {
    setEdit(false);
    setTitle(column.title);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: CreateTaskProps) => {
    // dispatch(createColumn(data));
  };

  const formSubmit: SubmitHandler<FieldValues> = (data) => {
    const newTask = {
      title: data.title,
      order: tasks.length + 1,
      description: data.description,
      userId: 1,
      users: data.users,
    };
    if (board) {
      onSubmit({
        id: board?._id,
        columnId: column._id,
        task: newTask,
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
    control,
  } = useForm<TaskData>({
    defaultValues: {
      title: '',
      description: '',
      users: [],
    },
    mode: 'onChange',
  });

  return (
    <>
      <div className={style.board}>
        <div className={style.close}>
          <Tooltip title="Удалить колонку">
            <CloseIcon />
          </Tooltip>
        </div>
        <div className={style.board__header}>
          {!edit ? (
            <h3 onClick={() => setEdit(true)} className={style.board__title}>
              {title}
            </h3>
          ) : (
            <div className={style.input}>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                error={error}
                required
                size="small"
                value={title}
                variant="standard"
              />
              <div>
                <CheckIcon color="success" onClick={changeTitle} />
              </div>
              <div>
                <CloseIcon onClick={cancelEdit} color="error" />
              </div>
            </div>
          )}
        </div>
        <div className={style.board__content}>
          {tasks.map((task) => {
            return <BoardTask task={task} key={task._id} />;
          })}
        </div>
        <Button
          sx={{ color: '#fff', borderColor: '#fff' }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Добавить задачу
        </Button>
      </div>
      <TaskModal
        open={open}
        handleClose={handleClose}
        formSubmit={formSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        control={control}
      />
    </>
  );
}

export default Board;
