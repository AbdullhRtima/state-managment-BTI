import React, { useEffect, useContext } from 'react';
import GlobalState, { ACTIONS, GlobalContext } from './utils/context/GlobalContext';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import Uploader from './pages/ImageUploader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import { NotFound } from './pages/Common/NotFound/NotFound';
import useAuth from './utils/hooks/Auth';

import './App.css';

const App = () => {
  useAuth();
  return (
    <div className="App">
      <Uploader />
    </div>
  );
};

const MainApp = () => {
  return (
    <GlobalState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalState>

  )
}
export default MainApp;
