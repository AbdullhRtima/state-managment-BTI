import React, { useState, useEffect, useContext } from 'react';
import { ACTIONS, GlobalContext } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { getDataLocalStorage } from '../../helpers/localStorageHelper';

const useAuth = () => {
    // state 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // global state
    const { globalState, dispatch } = useContext(GlobalContext);
    console.log("🚀 ~ file: index.js ~ line 10 ~ useAuth ~ globalState", globalState)
    // hooks 
    const navigate = useNavigate();

    useEffect(() => {
        const userData = getDataLocalStorage('user-data');

        if (userData) {
            setIsAuthenticated(true);
            if (globalState.userData === null) {
                dispatch({ type: ACTIONS.CACHE_USER_DATA, payload: userData });
            }
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [globalState]);

    return {
        isAuthenticated
    }
}


export default useAuth;