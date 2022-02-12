import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';


const NetworkHeaderComponent = () => {
    return (
        <div className='network-header'>
            <p>"Pseudo utilisateur"</p>
            <NavLink to="/Profil">
                <Avatar alt="avatar-1" src="../images/avatar/1.png"
                sx={{ width: 70, height: 70 }} 
                />
                Voir Profil
            </NavLink>
        </div>
    );
};

export default NetworkHeaderComponent;