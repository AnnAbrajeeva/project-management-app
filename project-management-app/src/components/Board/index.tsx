import React, { useState } from 'react';
import BoardTask from 'components/BoardTask';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import style from './Board.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Tooltip, TextField } from '@mui/material';
import { ColumnProps } from 'utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateColumn } from 'redux/thunks';
import { AppDispatch, RootState } from 'redux/store';

function Board({ column }: ColumnProps) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(column.title);
  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector((state: RootState) => state.board.board);

  const error = title ? false : true;

  function changeTitle() {
    if (board) {
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

  return (
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
        <BoardTask />
        <BoardTask />
        <BoardTask />
        <BoardTask />
      </div>
      <Button
        sx={{ color: '#fff', borderColor: '#fff' }}
        variant="outlined"
        startIcon={<AddIcon />}
      >
        Добавить задачу
      </Button>
    </div>
  );
}

export default Board;
