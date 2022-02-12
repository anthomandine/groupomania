import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation'>
            
                <NavLink  to="/Login">
                    Conexion
                </NavLink>
                <NavLink to="/SignIn">
                   Inscription
                </NavLink>
        </div>
    );
};




export default Navigation;
