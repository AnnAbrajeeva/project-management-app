import React from 'react';
import LoaderImg from '../../assets/img/VZvw.gif';
import style from './Loader.module.scss';

function Loader() {
  return (
    <div className={style.wrapper}>
      <div className={style.loader}>
        <img src={LoaderImg} alt="Loader" />
      </div>
    </div>
  );
}

export default Loader;
