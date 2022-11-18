import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import style from './BoardCard.module.scss';
import { Link } from 'react-router-dom';
import { BoardCardProps } from 'utils/types';
import { getIndex } from 'utils/getIndex';

function BoardCard({ board, index }: BoardCardProps) {
  return (
    <div className={style.card}>
      <div className={style.box}>
        <div className={style.content}>
          <h2>{getIndex(index)}</h2>
          <h3>{board.title}</h3>
          <Link to={`/boards/${board._id}`}>Go to the board</Link>
          <div className={style.buttons}>
            <div className={style.edit}>
              <EditIcon />
            </div>
            <div className={style.delete}>
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
