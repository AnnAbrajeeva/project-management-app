import { Container, Grid } from '@mui/material';
import Paper from '@mui/material/Paper/Paper';
import React from 'react';
import { Link } from 'react-router-dom';
import RsLogo from '../../assets/img/rs_school_js.svg';
import style from './Footer.module.scss';

function Footer() {
  return (
    <footer className={style.footer}>
      <Paper
        sx={{
          paddingTop: '15px',
          paddingBottom: '15px',
          backgroundColor: '#2E3B55',
          color: '#fff',
        }}
        elevation={3}
      >
        <Container>
          <Grid sx={{ alignItems: 'center' }} container spacing={2}>
            <Grid item xs={12} md={4}>
              <div className={style.gitlinks}>
                <Link className={style.links} to={'https://github.com/AnnAbrajeeva'}>
                  AnnAbrajeeva
                </Link>
                <Link className={style.links} to={'https://github.com/shahzod222'}>
                  shahzod222
                </Link>
              </div>
            </Grid>
            <Grid item xs={6} md={4}>
              <p className={style.text}>© 2022</p>
            </Grid>
            <Grid item xs={6} md={4}>
              <Link className={style.links} to={'https://rs.school/react/'}>
                <img src={RsLogo} alt="RS School" />
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </footer>
  );
}

export default Footer;
