import React from 'react';
import Button from '@mui/material/Button';
import style from './NotFound.module.scss';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className={style.error}>
      <h1>404</h1>
      <p>Извините, страница не найдена</p>
      <Link to={'/'}>
        <Button sx={{ color: '#fff', border: '1px solid #fff' }} variant="outlined">
          Вернуться на главную
        </Button>
      </Link>
    </div>
  );
}

export default NotFound;
