// use rafce command to create a component 
import React, { useContext } from 'react';
import { GlobalContext } from '../../utils/context/GlobalContext';
import Gravatar from 'react-gravatar'
import './UserCard.css';

const UserCard = () => {
    const { globalState } = useContext(GlobalContext);
    console.log("🚀 ~ file: UserCard.jsx ~ line 9 ~ UserCard ~ globalState", globalState?.userData?.displayName)

    return (
        <div className='user-card'>
            <Gravatar style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px"
            }} email="blahblah@blah.com" size={150} rating="pg" default="monsterid" className="CustomAvatar-image" />
            {/* <img className='profile-img' src={globalState?.userData?.photoURL || ''} alt='user-pic' /> */}
            <h3>{globalState?.userData?.displayName || ''}</h3>
        </div>
    )
}

export default UserCard;
