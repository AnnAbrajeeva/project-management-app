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
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/boards/:id" element={<BoardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
