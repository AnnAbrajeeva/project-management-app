import React, { useEffect, useState } from 'react';
import BoardTask from 'components/BoardTask';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import style from './Board.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Tooltip, TextField } from '@mui/material';
import { ColumnProps, Task } from 'utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateColumn, deleteColumn, deleteTask } from 'redux/thunks';
import { AppDispatch, RootState } from 'redux/store';
import TaskModal from './TaskModal';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import { setOpen } from '../../redux/slices/snackbarSlice';
import { Draggable, Droppable } from 'react-beautiful-dnd';

function Board({ column, index }: ColumnProps) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [open, setModalShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editTask, setEditTask] = useState<Task>();
  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector((state: RootState) => state.board.board);
  const { tasks, status: taskStatus } = useSelector((state: RootState) => state.tasks);
  const { error, status } = useSelector((state: RootState) => state.columns);

  useEffect(() => {
    if (board?._id) {
      dispatch(fetchTasks({ id: board?._id, columnId: column._id }));
    }
  }, [dispatch, board?._id, column._id]);

  const errorInput = title ? false : true;
  const columnTasks = tasks.filter((task) => task.columnId === column._id);

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
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const openConfirmModal = () => {
    setShowConfirm(true);
  };

  const closeConfirmModal = () => {
    setShowConfirm(false);
  };

  function handleDeleteColumn() {
    openConfirmModal();
  }

  function selectEditTask(task: Task) {
    setEditTask(task);
    handleClickOpen();
  }

  async function removeColumn() {
    if (board) {
      await dispatch(deleteColumn({ boardId: board?._id, columnId: column._id }));
      if (tasks.length) {
        Promise.all(
          tasks.map((task) =>
            dispatch(deleteTask({ boardId: board._id, columnId: column._id, taskId: task._id }))
          )
        );
      }

      if (status === 'error' || taskStatus === 'error') {
        dispatch(
          setOpen({
            open: true,
            message: error,
            view: 'error',
          })
        );
      }
      if (status === 'success' && taskStatus === 'success') {
        closeConfirmModal();
        dispatch(
          setOpen({
            open: true,
            message: 'Колонка успешно удалена',
            view: 'success',
          })
        );
      }
    }
  }

  return (
    <>
      <Draggable draggableId={column._id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={style.board}
          >
            <div onClick={handleDeleteColumn} className={style.close}>
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
                    error={errorInput}
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
            <Droppable droppableId={column._id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={style.board__content}
                >
                  {columnTasks.map((task, i) => {
                    return (
                      <BoardTask selected={selectEditTask} task={task} key={task._id} index={i} />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Button
              sx={{ color: '#fff', borderColor: '#fff' }}
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
            >
              Добавить задачу
            </Button>
          </div>
        )}
      </Draggable>
      <TaskModal
        open={open}
        handleClose={handleClose}
        tasks={tasks}
        board={board!}
        columnId={column._id}
        task={editTask}
      />
      <ConfirmModal
        showConfirm={showConfirm}
        handleClose={closeConfirmModal}
        action={removeColumn}
        title={'Вы действительно хотите удалить колонку со всеми тасками?'}
        loading={status}
      />
    </>
  );
}

export default Board;
