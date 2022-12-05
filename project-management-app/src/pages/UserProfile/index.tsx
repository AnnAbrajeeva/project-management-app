import React, { useEffect } from 'react';
import { Paper, Container } from '@mui/material';
import style from './UserProfile.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { getUser } from 'redux/thunks';
import { useSelector } from 'react-redux';
import ProfileForm from 'components/ProfileForm';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

function UserProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const user = useSelector((state: RootState) => state.users.user);
  const { t } = useTranslation();

  useEffect(() => {
    async function receiveUser() {
      if (userId) {
        await dispatch(getUser(userId));
      }
    }
    receiveUser();
  }, [userId]);

  return (
    <div className={style.main}>
      <div className={style.wrapper}></div>
      <Paper
        sx={{
          backgroundColor: 'transparent',
          pt: '20px',
          pb: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80%',
        }}
        elevation={0}
      >
        <Container
          sx={{
            backgroundColor: 'transparent',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          maxWidth="lg"
        >
          {user && (
            <>
              <h1 className={style.title}>{t('user_settings')}</h1>
              <div className={style.formWrapper}>
                <ErrorBoundary>
                  <ProfileForm user={user!} />
                </ErrorBoundary>
              </div>
            </>
          )}
        </Container>
      </Paper>
    </div>
  );
}

export default UserProfile;
