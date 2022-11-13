import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import style from './BoardInfo.module.scss';

function EmptyBoard() {
  return (
    <div className={style.empty}>
      <AddIcon />
      <p>Добавить колонку</p>
    </div>
  );
}

export default EmptyBoard;
