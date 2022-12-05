import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import style from './BoardInfo.module.scss';
import { EmptyBoardProps } from 'utils/types';

function EmptyBoard({ text, action }: EmptyBoardProps) {
  return (
    <div onClick={action} className={style.empty}>
      <AddIcon />
      <p>{text}</p>
    </div>
  );
}

export default EmptyBoard;
