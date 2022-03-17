import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


const NotFound = () => {
    return (
        <div className='notfound'>
            <h1>Erreur 404</h1>
            <p>Page NotFound</p>
            <NavLink  to="/" >
                <HomeIcon />retour home
            </NavLink>
        </div>
    );
};

export default NotFound;