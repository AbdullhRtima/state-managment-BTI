import React, { useEffect, useContext } from 'react';
import GlobalState, { ACTIONS, GlobalContext } from './utils/context/GlobalContext';
import Header from './components/Header';

import './App.css';

const App = () => {

  // global state
  const { globalState, dispatch } = useContext(GlobalContext);
  console.log("🚀 ~ file: App.js ~ line 11 ~ App ~ globalState", globalState)

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
