import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setModal } from 'redux/slices/boardSlice';
import { removeUser } from 'redux/slices/userSlice';
import { removeFromLocal } from 'utils/localStorage';
import style from './Header.module.scss';

function DrawerMenu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function addBoard() {
    dispatch(setModal(true));
  }

  function goToProfile() {
    navigate('/profile');
  }

  const logOut = () => {
    dispatch(removeUser());
    removeFromLocal('token');
    removeFromLocal('user');
    navigate('/welcome');
  };

  return (
    <List>
      <ListItem onClick={addBoard} disablePadding>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary={t('create_new_board')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={goToProfile} sx={{ textAlign: 'center' }}>
          <ListItemText primary={t('edit_profile')} />
        </ListItemButton>
      </ListItem>
      <ListItem onClick={logOut} disablePadding>
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary={t('logOut')} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default DrawerMenu;
