import SearchBox from 'components/SearchBox';
import React from 'react';
import { BoardsPageHeaderProps } from 'utils/types';
import style from './BoardsPageHeader.module.scss';

function BoardsPageHeader({ title }: BoardsPageHeaderProps) {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>{title}</h1>
      <SearchBox />
    </div>
  );
}

export default BoardsPageHeader;
