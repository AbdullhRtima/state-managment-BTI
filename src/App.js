import React, { useEffect, useContext } from 'react';
import GlobalState, { ACTIONS, GlobalContext } from './utils/context/GlobalContext';
import Header from './components/Header';
import Uploader from './pages/ImageUploader';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Login from './pages/Auth/Login';
import { NotFound } from './pages/Common/NotFound/NotFound';
import useAuth from './utils/hooks/Auth';
import Quiz from './pages/Quiz';
import QuizDetails from './pages/QuizDetails';

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
          <Route path="/quiz" element={<Quiz />} />
          <Route path="quiz/details/:id" element={<QuizDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalState>

  )
}
export default MainApp;
