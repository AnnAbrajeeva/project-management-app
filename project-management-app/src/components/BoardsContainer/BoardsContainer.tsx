import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { Grid } from '@mui/material';
import BoardCard from 'components/BoardCard/BoardCard';
import EmptyBoard from '../BoardInfo/EmptyBoard';
import React, { useEffect } from 'react';
import { fetchBoards, getUsers } from 'redux/thunks';
import Loader from 'components/Loader';
import { Board } from 'utils/types';
import { setModal } from 'redux/slices/boardSlice';
import { useTranslation } from 'react-i18next';
import { getFromLocal } from 'utils/localStorage';

function BoardsContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, boards } = useSelector((state: RootState) => state.board);
  const { t } = useTranslation();

  useEffect(() => {
    const isAuth = getFromLocal('token');
    if (isAuth) {
      dispatch(fetchBoards());
      dispatch(getUsers());
    }
  }, [dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  function openModal() {
    dispatch(setModal(true));
  }

  return (
    <Grid container sx={{ position: 'relative' }}>
      {boards.map((board: Board, i) => {
        return (
          <Grid key={board._id} item xs={12} md={6} lg={4}>
            <BoardCard board={board} index={i} />
          </Grid>
        );
      })}

      <Grid sx={{ padding: '30px' }} item xs={12} md={6} lg={4}>
        <EmptyBoard action={openModal} text={t('add_board')} />
      </Grid>
    </Grid>
  );
}

export default BoardsContainer;
