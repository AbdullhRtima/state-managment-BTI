// use rafce command to create a component 
import React, { useCallback, useContext } from 'react';
import { ACTIONS, GlobalContext } from '../../utils/context/GlobalContext';
import Gravatar from 'react-gravatar'
import './UserCard.css';
import { Button, Popover } from 'antd';
import { logout } from '../../utils/firebase/authHelper';
import { removeDataLocalStorage } from '../../utils/helpers/localStorageHelper';
import { useNavigate } from 'react-router-dom';
const UserCard = () => {
    const { globalState, dispatch } = useContext(GlobalContext);
    // hooks 
    const navigate = useNavigate();
    // logout 
    const onLogout = useCallback(() => {
        removeDataLocalStorage('user-data');
        logout();
        dispatch({ type: ACTIONS.CACHE_USER_DATA, payload: null });
        navigate('/login');
    }, []);

    // TODO: enhance the performance 
    const renderPopoverContent = () => {
        return (
            <div>
                <Button onClick={() => onLogout()}>
                    logout
                </Button>
            </div>
        )
    };

    return (
        <Popover placement="bottom" title={null} content={renderPopoverContent} trigger="click">
            <div className='user-card'>
                <Gravatar style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px"
                }} email="blahblah@blah.com" size={150} rating="pg" default="monsterid" className="CustomAvatar-image" />
                {/* <img className='profile-img' src={globalState?.userData?.photoURL || ''} alt='user-pic' /> */}
                <h3>{globalState?.userData?.name || ''}</h3>
            </div>
        </Popover>

    )
}

export default UserCard;
