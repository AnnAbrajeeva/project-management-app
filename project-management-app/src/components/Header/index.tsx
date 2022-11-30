import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Logo from '../../assets/img/clipboard.png';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';
import { Box, Divider, Drawer } from '@mui/material';
import NavLinks from './NavLinks';
import DrawerMenu from './DrawerMenu';
import { useState } from 'react';
import { HeaderProps } from 'utils/types';

function Header({ location }: HeaderProps) {
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  });

  const styleHeader = {
    background: scrollTrigger ? '#fff' : '#2E3B55',
    transition: 'all 0.3s ease',
    color: scrollTrigger ? '#000' : '#fff',
    flex: '0 0 auto',
  };

  const [hide, setHide] = useState(true);

  useEffect(() => {
    const hideHeaderPaths = ['/welcome', '/login', '/registration'];
    if (hideHeaderPaths.includes(location)) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [location]);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const container = window !== undefined ? () => window.document.body : undefined;
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link className={style.logoDraw} to="/">
        <Avatar sx={{ mr: 1, cursor: 'pointer' }} alt="Logo" src={Logo} />

        <Typography variant="h6" component="div">
          TaskMaster
        </Typography>
      </Link>
      <Divider />
      <DrawerMenu />
    </Box>
  );

  return (
    <>
      {!hide && (
        <>
          <AppBar position="sticky" style={styleHeader} component="nav">
            <Container>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <Link className={style.logo} to="/">
                  <Avatar sx={{ mr: 1, cursor: 'pointer' }} alt="Logo" src={Logo} />

                  <Typography variant="h6" component="div">
                    TaskMaster
                  </Typography>
                </Link>
                <NavLinks />
              </Toolbar>
            </Container>
          </AppBar>
          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
        </>
      )}
    </>
  );
}

export default Header;
