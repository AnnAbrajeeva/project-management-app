import { Button } from '@mui/material';
import BoardInfo from 'components/BoardInfo';
import BoardsPageHeader from 'components/BoardsPageHeader';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Loader from 'components/Loader';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setOpen } from 'redux/slices/snackbarSlice';
import { AppDispatch, RootState } from 'redux/store';
import { fetchBoardById, fetchColumnsById, fetchTasks, getUsers } from 'redux/thunks';
import { getFromLocal } from 'utils/localStorage';
import { Column } from 'utils/types';
import style from './BoardPage.module.scss';

function BoardPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { board, status } = useSelector((state: RootState) => state.board);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const isAuth = getFromLocal('token');
    if (!isAuth) {
      setOpen({
        open: true,
        message: 'Время действия токена истекло.',
        view: 'error',
      });
      navigate('/welcome');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        dispatch(fetchColumnsById(id)).then((res) => {
          if (res.payload) {
            res.payload.map(async (column: Column) => {
              await dispatch(fetchTasks({ id: column.boardId, columnId: column._id }));
            });
          }
        });
        await dispatch(fetchBoardById(id));
        await dispatch(getUsers());
      }
    };
    fetchData();
  }, [dispatch, id]);

  const title = board ? board.title : '';

  return (
    <div className={style.main}>
      <div className={style.wrapper}></div>
      <div className={style.container}>
        <Link className={style.button} to={'/'}>
          <Button variant="contained">{t('goBack')}</Button>
        </Link>
        <BoardsPageHeader title={`Board: ${title}`} />
        {status === 'loading' ? (
          <Loader />
        ) : (
          <ErrorBoundary>
            <BoardInfo />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}

export default BoardPage;
