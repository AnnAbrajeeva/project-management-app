import BoardInfo from 'components/BoardInfo';
import BoardsPageHeader from 'components/BoardsPageHeader';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from 'redux/store';
import { fetchBoardById, fetchColumnsById, getUsers } from 'redux/thunks';
import style from './BoardPage.module.scss';

function BoardPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector((state: RootState) => state.board.board);

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
        <BoardInfo />
      </div>
    </div>
  );
}

export default BoardPage;
