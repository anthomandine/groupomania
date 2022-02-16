import { Avatar } from '@mui/material';
import React from 'react';
import CustomizedDialogs from './Profil';


const NetworkHeaderComponent = () => {
    return (
        <div className='network-header'>
            <Avatar alt="avatar-1" src="../images/avatar/1.png" sx={{ width: 70, height: 70 }} />
            <p>"Pseudo utilisateur"</p>
            <CustomizedDialogs />
        </div>
    );
};

export default NetworkHeaderComponent;