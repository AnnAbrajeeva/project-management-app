import React from 'react';
import { Paper } from '@mui/material';
import Board from 'components/Board';
import style from './BoardInfo.module.scss';

function BoardInfo() {
  return (
    <Paper
      sx={{ backgroundColor: 'transparent', pt: '20px', pb: '20px', position: 'relative' }}
      elevation={0}
    >
      <div className={style.wrapper}>
        <Board />
      </div>
    </Paper>
  );
}

export default BoardInfo;
