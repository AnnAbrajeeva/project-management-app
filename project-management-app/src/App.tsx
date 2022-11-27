import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat'].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {window.location.pathname !== ('/welcome' || '/sign-in') && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<AuthPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/boards/:id" element={<BoardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toast />
    </ThemeProvider>
  );
}

export default App;
