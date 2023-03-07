import React, { useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import './App.css';
import Footer from 'components/Footer';
import Welcome from 'pages/WelcomePage';
import BoardPage from 'pages/BoardPage/BoardPage';
import NotFound from 'pages/NotFound';
import LoginPage from 'pages/LoginPage';
import AuthPage from 'pages/AuthPage';
import Toast from 'components/Toast/Toast';
import { useDispatch } from 'react-redux';
import { removeUser } from 'redux/slices/userSlice';
import { removeFromLocal } from 'utils/localStorage';
import AuthVerify from 'common/AuthVerify';
import UserProfile from 'pages/UserProfile';
import BoardModal from 'components/BoardsContainer/BoardModal';

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat'].join(','),
  },
});

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const logOut = useCallback(() => {
    dispatch(removeUser());
    removeFromLocal('token');
    removeFromLocal('user');
    return <Navigate to={'/welcome'} />;
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Header location={location.pathname} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<AuthPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/boards/:id" element={<BoardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toast />
      <BoardModal />
      <AuthVerify logOut={logOut} />
    </ThemeProvider>
  );
}

export default App;
