import React from 'react';
import BoardTask from 'components/BoardTask';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import style from './Board.module.scss';
import { Button, Tooltip } from '@mui/material';

function Board() {
  return (
    <div className={style.board}>
      <div className={style.close}>
        <Tooltip title="Удалить колонку">
          <CloseIcon />
        </Tooltip>
      </div>
      <div className={style.board__header}>
        <h3 className={style.board__title}>ToDo</h3>
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
