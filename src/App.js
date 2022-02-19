import React, { Suspense, useEffect, useMemo, useState, lazy } from 'react';
import GlobalState, { ACTIONS, GlobalContext } from './utils/context/GlobalContext';
import Header from './components/Header';
import Uploader from './pages/ImageUploader';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { NotFound } from './pages/Common/NotFound/NotFound';
import useAuth from './utils/hooks/Auth';
import Quiz from './pages/Quiz';
import QuizDetails from './pages/QuizDetails';
import SignUp from './pages/Auth/SignUp/SignUp';
import { ConfigProvider } from 'antd';
import { getCurrentDirection, getDirection } from './utils/helpers/languageHelper';
import { getDataLocalStorage } from './utils/helpers/localStorageHelper';
import { useTranslation } from 'react-i18next';
import './App.css';

// lazy load 
const Login = lazy(() => import('./pages/Auth/LoginTwo'));

const App = () => {
  useAuth();
  return (
    <div className="App">
      <Uploader />
    </div>
  );
};
const MainApp = () => {
  // hooks
  const { i18n } = useTranslation();

  const dir = useMemo(() => {
    return getDirection();
  }, [i18n.language]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfigProvider direction={dir}>
        <GlobalState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="quiz/details/:id" element={<QuizDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </GlobalState>
      </ConfigProvider>
    </Suspense>

  )
}
export default MainApp;
