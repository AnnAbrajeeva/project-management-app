import React from 'react';
import { Paper } from '@mui/material';
import Board from 'components/Board';
import style from './BoardInfo.module.scss';
import EmptyBoard from './EmptyBoard';

function BoardInfo() {
  return (
    <Paper
      sx={{ backgroundColor: 'transparent', pt: '20px', pb: '20px', position: 'relative' }}
      elevation={0}
    >
      <div className={style.wrapper}>
        <Board />
        <EmptyBoard action={() => console.log('column')} text="Добавить колонку" />
      </div>
    </Paper>
  );
}

export default BoardInfo;
