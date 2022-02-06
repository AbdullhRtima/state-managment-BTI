// use rafce command to create a component 
import React, { useContext } from 'react';
import { GlobalContext } from '../../utils/context/GlobalContext';

import './UserCard.css';

const UserCard = () => {
    const { globalState } = useContext(GlobalContext);

    return (
        <div className='user-card'>
            <img className='profile-img' src={globalState?.userData?.profilePic || ''} alt='user-pic' />
            <h3>{globalState?.userData?.name || ''}</h3>
        </div>
    )
}

export default UserCard;
