import React, { useEffect, useContext } from 'react';
import { ACTIONS, GlobalContext } from '../../../utils/context/GlobalContext';
import useAuth from '../../../utils/hooks/Auth';

const Login = () => {
    // global state
    const { globalState, dispatch } = useContext(GlobalContext);
    // useEffect
    useEffect(() => {
        const userData = {
            name: 'John Doe',
            age: 30,
            profilePic: 'https://picsum.photos/id/237/200/300',
            isAuth: true
        }
        dispatch({ type: ACTIONS.CACHE_USER_DATA, payload: userData });
    }, []);
    const { isAuthenticated } = useAuth();

    return (
        <div>
            Login page
        </div>
    )
};
export default Login;