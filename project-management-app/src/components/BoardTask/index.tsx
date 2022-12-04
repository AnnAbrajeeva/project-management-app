import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import style from './BoardTask.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { Paper, Tooltip } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import User from '../../assets/img/user.png';
import { BoardTaskProps } from 'utils/types';
import TaskDescrModal from './TaskDescrModal';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import { deleteTask } from 'redux/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { setOpen } from 'redux/slices/snackbarSlice';
import { Draggable } from 'react-beautiful-dnd';

function BoardTask({ task, selected, index }: BoardTaskProps) {
  const [showDescr, setShoWDescr] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { error, status } = useSelector((state: RootState) => state.columns);
  const { users } = useSelector((state: RootState) => state.users);

  function handleShowDescr() {
    setShoWDescr(true);
  }

  function handleHideDescr() {
    setShoWDescr(false);
  }

  function handleShowConfirm() {
    setShowConfirm(true);
  }

  function handleHideConfirm() {
    setShowConfirm(false);
  }

  function removeTask() {
    handleShowConfirm();
  }

  function removeSelectedTask() {
    dispatch(deleteTask({ boardId: task.boardId, columnId: task.columnId, taskId: task._id }));
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
      handleHideConfirm();
      dispatch(
        setOpen({
          open: true,
          message: 'Таск успешно удалён!',
          view: 'success',
        })
      );
    }
  }

  const allUsers = users.map((user) => user.name);
  const usersArr = !task.users.length ? allUsers : task.users;

  return (
    <Draggable draggableId={task._id} key={task._id} index={index}>
      {(provided) => (
        <Paper sx={{ backgroundColor: 'transparent' }}>
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{ minWidth: 275, overflow: 'visible', position: 'relative' }}
          >
            <div className={style.close}>
              <Tooltip onClick={removeTask} title="Удалить задачу">
                <CloseIcon />
              </Tooltip>
            </div>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <BookmarkIcon />
              <Typography variant="h6" component="div">
                {task.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Tooltip onClick={handleShowDescr} title="Посмотреть задачу">
                <div className={style.icon}>
                  <RemoveRedEyeIcon />
                </div>
              </Tooltip>
              <Tooltip title="Редактировать задачу">
                <div onClick={() => selected(task)} className={style.icon}>
                  <EditIcon />
                </div>
              </Tooltip>
              <div className={style.users}>
                {usersArr.map((user, i) => {
                  return (
                    <Tooltip title={user} key={i}>
                      <div className={style.user}>
                        <img src={User} alt={user} />
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </CardActions>
          </Card>

          <TaskDescrModal task={task} open={showDescr} handleClose={handleHideDescr} />
          <ConfirmModal
            showConfirm={showConfirm}
            handleClose={handleHideConfirm}
            action={removeSelectedTask}
            title="Вы действительно хотите удалить этот таск?"
            loading={status}
          />
        </Paper>
      )}
    </Draggable>
  );
}

export default BoardTask;
