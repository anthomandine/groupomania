import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


const handleClick = (e) => {
    e.preventDefault();
    sessionStorage.clear();
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