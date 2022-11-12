import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import style from './BoardCard.module.scss';
import { Link } from 'react-router-dom';

function BoardCard() {
  return (
    <Link to={'/'}>
      <div className={style.card}>
        <div className={style.box}>
          <div className={style.content}>
            <h2>01</h2>
            <h3>Card One</h3>
            <a href="#">Go to the board</a>
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
    </Link>
  );
}

export default BoardCard;
