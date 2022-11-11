import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <>
      {window.location.pathname !== '/welcome' && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
