import SearchBox from 'components/SearchBox';
import React from 'react';
import style from './BoardsPageHeader.module.scss';

function BoardsPageHeader() {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Boards</h1>
      <SearchBox />
    </div>
  );
}

export default BoardsPageHeader;
