import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';

function DrawerMenu() {
  return (
    <List>
      <Link to="/" className={style.links}>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Создать новую доску'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Редактировать профиль'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Выйти'} />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  );
}

export default DrawerMenu;
