import React from 'react';
import Button from '@mui/material/Button';
import style from './NotFound.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className={style.error}>
      <h1>404</h1>
      <p>{t('page_not_found')}</p>
      <Link to={'/'}>
        <Button sx={{ color: '#fff', border: '1px solid #fff' }} variant="outlined">
          {t('back_to_main')}
        </Button>
      </Link>
    </div>
  );
}

export default NotFound;
