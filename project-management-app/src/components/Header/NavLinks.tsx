import React from 'react';
import { Box, Button, ToggleButtonGroup, Tooltip, useMediaQuery } from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const ToggleButton = styled(MuiToggleButton, {
  shouldForwardProp: (prop) => prop !== 'selectedColor',
})(() => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'inherit',
    backgroundColor: 'red',
    borderColor: 'transparent',
  },
  '&, &.Mui:hover': {
    color: 'inherit',
    border: '1px solid rgb(220 220 220 / 75%);',
    lineHeight: 1,
  },
}));

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

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setLang(newAlignment);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Tooltip title="Создать новую доску">
            <Button sx={{ color: 'inherit' }} startIcon={<AddCircleOutlineIcon />}>
              {matches && <p>Создать новую доску</p>}
            </Button>
          </Tooltip>
          <Tooltip title="Редактировать профиль">
            <Button sx={{ color: 'inherit' }} startIcon={<ManageAccountsIcon />}>
              {matches && <p>Редактировать профиль</p>}
            </Button>
          </Tooltip>
          <Tooltip title="Выйти">
            <Button sx={{ color: 'inherit' }} startIcon={<LogoutIcon />}>
              {matches && <p>Выйти</p>}
            </Button>
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
