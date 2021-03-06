import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomizedDialogsAdmin from './EditUsers';
import CustomizedDialogs from './Profil';

const NetworkHeaderComponent = (props) => {

    //---------Init variables----------//

    const isadmin = localStorage.getItem('isadmin');
    const [pseudo, setPseudo] = useState(localStorage.getItem('user'));
    const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));

    useEffect(() => {
        setPseudo(localStorage.getItem('user'));
        setAvatar(localStorage.getItem('avatar'));
    }, [props.profilLoad]);

    return (
        <div className='network-header'>
            <Avatar alt="avatar-1" src={avatar} sx={{ width: 70, height: 70 }} />
            <p>Bienvenue sur votre fil d'actualité, <strong>{pseudo}</strong>.</p>
            <CustomizedDialogs isProfilLoad={props.isProfilLoad} />
            {parseInt(isadmin) === 1 && <CustomizedDialogsAdmin isLoadF={props.isLoadF} isload={props.isload} />}
        </div>
    );
};

export default NetworkHeaderComponent;