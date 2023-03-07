import { Button, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './styles.css';
import { ToggleButton } from './styled';
import { getFromLocal } from 'utils/localStorage';
import Img from '../../assets/img/process_optimization_5.jpg';

function Welcome() {
  const { t, i18n } = useTranslation();
  const isAuth = getFromLocal('token');

  const activeLang = localStorage.getItem('i18nextLng')
    ? localStorage.getItem('i18nextLng')!.toUpperCase()
    : 'RU';
  const [lang, setLang] = React.useState<string>(activeLang);

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setLang(newAlignment);
    i18n.changeLanguage(newAlignment.toLowerCase());
  };
  return (
    <div className="welcome">
      <div className="welcome-header">
        {!isAuth ? (
          <div className="links">
            <Link className="link" to={'/login'}>
              <Button variant="contained">{t('logIn')}</Button>
            </Link>

            <Link className="link" to={'/registration'}>
              <Button variant="contained">{t('registration')}</Button>
            </Link>
          </div>
        ) : (
          <Link className="link" to={'/'}>
            <Button variant="contained">На главную</Button>
          </Link>
        )}

        <ToggleButtonGroup
          value={lang}
          exclusive
          onChange={handleAlignment}
          aria-label="change lang"
          className="lang"
        >
          <ToggleButton value="RU" aria-label="RU">
            RU
          </ToggleButton>
          <ToggleButton value="EN" aria-label="EN">
            EN
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="container">
        <div className="welcome-main">
          <div className="welcome-info">
            <p>{t('welcome_text_1')}</p>
            <img
              className="welcome-img"
              src="https://img.freepik.com/free-vector/scrum-method-concept-illustration_114360-9828.jpg?w=2000"
              alt="img"
            />
          </div>
        </div>
        <div className="welcome-main2">
          <div className="welcome-info welcome-info2">
            <p>{t('welcome_text_2')}</p>
            <img className="welcome-img" src={Img} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
