import { Avatar } from '@mui/material';
import React from 'react';
import CustomizedDialogsAdmin from './EditUsers';
import CustomizedDialogs from './Profil';

const NetworkHeaderComponent = () => {

//---------Init variables----------//
    
    const pseudo = localStorage.getItem('user');
    const avatar = localStorage.getItem('avatar');
    const isadmin = localStorage.getItem('isadmin');

    return (
        <div className='network-header'>
            <Avatar alt="avatar-1" src={avatar} sx={{ width: 70, height: 70 }} />
            <p>Bienvenue sur votre fil d'actualité, <strong>{pseudo}</strong>.</p>
            <CustomizedDialogs />
            {parseInt(isadmin) === 1 && <CustomizedDialogsAdmin />}
        </div>
    );
};

export default NetworkHeaderComponent;