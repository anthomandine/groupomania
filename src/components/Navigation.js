import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation'>
            <NavLink to="/login">Conexion</NavLink>
            <NavLink to="/signIn">Inscription</NavLink>
        </div>
    );
};

export default Navigation;
