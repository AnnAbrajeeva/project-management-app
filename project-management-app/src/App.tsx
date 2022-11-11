import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import './App.css';
import Footer from 'components/Footer';
import Welcome from 'pages/WelcomePage';

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat'].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {window.location.pathname !== '/welcome' && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
