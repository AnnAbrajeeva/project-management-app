import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import style from './BoardCard.module.scss';
import { Link } from 'react-router-dom';
import { Board, BoardCardProps } from 'utils/types';
import { getIndex } from 'utils/getIndex';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { deleteBoard } from 'redux/thunks';
import { setEditBoard, setModal } from 'redux/slices/boardSlice';
import User from '../../assets/img/user.png';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import { useSelector } from 'react-redux';
import { setOpen } from 'redux/slices/snackbarSlice';

function BoardCard({ board, index }: BoardCardProps) {
  const [show, setShow] = useState(false);
  const { status, error } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  async function removeBoard() {
    await dispatch(deleteBoard(board._id));
    if (status === 'error') {
      dispatch(
        setOpen({
          open: true,
          message: error,
          view: 'error',
        })
      );
    }
    if (status === 'success') {
      closeConfirm();
      dispatch(
        setOpen({
          open: true,
          message: t('deleteBoard_success_message'),
          view: 'success',
        })
      );
    }
  }

  function openConfirm() {
    setShow(true);
  }

  function closeConfirm() {
    setShow(false);
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
              <div onClick={openConfirm} className={style.delete}>
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
      <ConfirmModal
        showConfirm={show}
        handleClose={closeConfirm}
        title={t('del_board_confirm')}
        loading={status}
        action={removeBoard}
      />
    </div>
  );
}

export default BoardCard;
