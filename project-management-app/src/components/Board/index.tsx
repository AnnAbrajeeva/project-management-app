import React, { useState } from 'react';
import BoardTask from 'components/BoardTask';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import style from './Board.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Tooltip, TextField } from '@mui/material';

function Board() {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');

  const error = title ? false : true;

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
            ToDo
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
              <CheckIcon color="success" />
            </div>
            <div>
              <CloseIcon color="error" />
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
