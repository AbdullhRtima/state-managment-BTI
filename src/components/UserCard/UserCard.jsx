// use rafce command to create a component 
import React, { useContext } from 'react';
import { GlobalContext } from '../../utils/context/GlobalContext';

import './UserCard.css';

const UserCard = () => {
    const { globalState } = useContext(GlobalContext);
    const { userData } = globalState;
    return (
        <div className='user-card'>
            <img className='profile-img' src={userData.profilePic} alt='user-pic' />
            <h3>{userData.name}</h3>
        </div>
    )
}

export default UserCard;
