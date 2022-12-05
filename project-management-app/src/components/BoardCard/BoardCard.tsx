import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import style from './BoardCard.module.scss';
import { Link } from 'react-router-dom';
import { Board, BoardCardProps } from 'utils/types';
import { getIndex } from 'utils/getIndex';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { deleteBoard } from 'redux/thunks';
import { setEditBoard, setModal } from 'redux/slices/boardSlice';
import User from '../../assets/img/user.png';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

function BoardCard({ board, index }: BoardCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  function removeBoard() {
    dispatch(deleteBoard(board._id));
  }

  function editBoard() {
    dispatch(setEditBoard(board));
    dispatch(setModal(true));
  }

  return (
    <div className={style.card}>
      <div className={style.box}>
        <div className={style.content}>
          <h2>{getIndex(index)}</h2>
          <h3>{board.title}</h3>
          <Link to={`/boards/${board._id}`}>{t('go_to_board')}</Link>
          <div className={style.buttons}>
            <div className={style.wrapper}>
              <div onClick={editBoard} className={style.edit}>
                <EditIcon />
              </div>
              <div onClick={removeBoard} className={style.delete}>
                <DeleteIcon />
              </div>
            </div>
          </div>
          <div className={style.users}>
            {board.users.map((user, i) => {
              return (
                <Tooltip title={user} key={i}>
                  <div className={style.user}>
                    <img src={User} alt="user" />
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
