import React, { useEffect, useContext } from 'react';
import GlobalState, { ACTIONS, GlobalContext } from './utils/context/GlobalContext';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';

import './App.css';

const App = () => {

  // global state
  const { globalState, dispatch } = useContext(GlobalContext);

  // useEffect
  useEffect(() => {
    const userData = {
      name: 'John Doe',
      age: 30,
      profilePic: 'https://picsum.photos/id/237/200/300'
    }
    dispatch({ type: ACTIONS.CACHE_USER_DATA, payload: userData });
  }, []);
  
  return (
    <div className="App">
      <Header />
      <ImageUploader />
    </div>
  );
};

const MainApp = () => {
  return (
    <GlobalState>
      <App />
    </GlobalState>
  )
}
export default MainApp;
