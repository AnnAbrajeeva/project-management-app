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

const theme = createTheme({
  palette: {
    text: {
      primary: '#00ff00',
    },
  },
});

function NavLinks() {
  const [lang, setLang] = React.useState<string | null>('RU');
  const matches = useMediaQuery('(min-width:921px)');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setLang(newAlignment);
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>
          <Tooltip title="Создать новую доску">
            <MyButton
              onClick={addBoard}
              sx={{ color: 'inherit' }}
              startIcon={<AddCircleOutlineIcon />}
            >
              {matches && <p className={style.text}>Создать новую доску</p>}
            </MyButton>
          </Tooltip>
          <Tooltip title="Редактировать профиль">
            <MyButton sx={{ color: 'inherit' }} startIcon={<ManageAccountsIcon />}>
              {matches && <p>Редактировать профиль</p>}
            </MyButton>
          </Tooltip>
          <Tooltip title="Выйти">
            <MyButton onClick={logOut} sx={{ color: 'inherit' }} startIcon={<LogoutIcon />}>
              {matches && <p>Выйти</p>}
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
