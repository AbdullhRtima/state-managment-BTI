// use rafce command to create a component 
import React from 'react';
import UserCard from '../UserCard';

import './Header.css';

const Header = () => {
    console.log(window.location.pathname);
    return (
        <div className='header'>
            <h1>
                BTI-GAZA
            </h1>
            <UserCard/>
        </div>
    )
}

export default Header;
