import BoardInfo from 'components/BoardInfo';
import BoardsPageHeader from 'components/BoardsPageHeader';
import Loader from 'components/Loader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setOpen } from 'redux/slices/snackbarSlice';
import { AppDispatch, RootState } from 'redux/store';
import { fetchBoardById, fetchColumnsById, getUsers } from 'redux/thunks';
import { getFromLocal } from 'utils/localStorage';
import style from './BoardPage.module.scss';

function BoardPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { board, status } = useSelector((state: RootState) => state.board);
  const navigate = useNavigate();

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
    if (id) {
      dispatch(fetchColumnsById(id));
      dispatch(fetchBoardById(id));
      dispatch(getUsers());
    }
  }, [dispatch, id]);

  const title = board ? board.title : '';

  return (
    <div className={style.main}>
      <div className={style.wrapper}></div>
      <div className={style.container}>
        <BoardsPageHeader title={`Board: ${title}`} />
        {status === 'loading' ? <Loader /> : <BoardInfo />}
      </div>
    </div>
  );
}

export default BoardPage;
