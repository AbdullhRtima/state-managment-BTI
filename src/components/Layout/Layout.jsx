import React from 'react';
import Header from '../Header';

const Layout = ({ children, isAuth }) => {
    let component = children;
    return isAuth ? (
        <div>
            <Header />
            {component}
        </div>
    ) : (
        <div>
            {component}
        </div>
    )

};

export default Layout;