import React from 'react';
import { Box, ToggleButtonGroup, Tooltip, useMediaQuery } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import style from './Header.module.scss';
import { MyButton, ToggleButton } from './styled';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { setModal } from '../../redux/slices/boardSlice';
import { removeUser } from 'redux/slices/userSlice';
import { removeFromLocal } from 'utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const theme = createTheme({
  palette: {
    text: {
      primary: '#00ff00',
    },
  },
});

function NavLinks() {
  const activeLang = localStorage.getItem('i18nextLng')
    ? localStorage.getItem('i18nextLng')!.toUpperCase()
    : 'RU';
  const [lang, setLang] = React.useState<string>(activeLang);
  const matches = useMediaQuery('(min-width:921px)');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setLang(newAlignment);
    i18n.changeLanguage(newAlignment.toLowerCase());
  };

  function addBoard() {
    dispatch(setModal(true));
  }

  function logOut() {
    dispatch(removeUser());
    removeFromLocal('token');
    removeFromLocal('user');
    navigate('/welcome');
  }

  function goToProfile() {
    navigate('/profile');
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>
          <Tooltip title={t('create_new_board')}>
            <MyButton
              onClick={addBoard}
              sx={{ color: 'inherit' }}
              startIcon={<AddCircleOutlineIcon />}
            >
              {matches && <p className={style.text}>{t('create_new_board')}</p>}
            </MyButton>
          </Tooltip>
          <Tooltip title={t('edit_profile')}>
            <MyButton
              onClick={goToProfile}
              sx={{ color: 'inherit' }}
              startIcon={<ManageAccountsIcon />}
            >
              {matches && <p>{t('edit_profile')}</p>}
            </MyButton>
          </Tooltip>
          <Tooltip title="Выйти">
            <MyButton onClick={logOut} sx={{ color: 'inherit' }} startIcon={<LogoutIcon />}>
              {matches && <p>{t('logOut')}</p>}
            </MyButton>
          </Tooltip>
        </Box>
        <ToggleButtonGroup
          value={lang}
          exclusive
          onChange={handleAlignment}
          aria-label="change lang"
        >
          <ToggleButton value="RU" aria-label="RU">
            RU
          </ToggleButton>
          <ToggleButton value="EN" aria-label="EN">
            EN
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </ThemeProvider>
  );
}

export default NavLinks;
