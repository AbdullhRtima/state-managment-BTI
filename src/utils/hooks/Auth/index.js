import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    // state 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // global state
    const { globalState, dispatch } = useContext(GlobalContext);
    console.log("🚀 ~ file: index.js ~ line 10 ~ useAuth ~ globalState", globalState)
    // hooks 
    const navigate = useNavigate();

    useEffect(() => {
        if (globalState?.userData?.isAuth) {
            setIsAuthenticated(true);
            navigate('/');
        }else{
            navigate('/login');
        }
    }, [globalState]);

    return {
        isAuthenticated
    }
}


export default useAuth;