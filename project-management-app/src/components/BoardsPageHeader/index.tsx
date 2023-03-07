import React from 'react';
import { BoardsPageHeaderProps } from 'utils/types';
import style from './BoardsPageHeader.module.scss';

function BoardsPageHeader({ title }: BoardsPageHeaderProps) {
  return (
    <div className={style.wrapper}>
      <div>
        <h1 className={style.title}>{title}</h1>
      </div>
    </div>
  );
}

export default BoardsPageHeader;
