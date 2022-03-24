import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

//---------Fonction déconnecter ------------------//

const handleClick = (e) => {
    e.preventDefault();
    localStorage.clear();
    };

const BackHome = () => {
    return (
        <div className='backhome' onClick={handleClick}>
            <NavLink  to="/" >
                <HomeIcon />
                <p>Déconnexion</p>
            </NavLink>
        </div>
    );
};

export default BackHome;