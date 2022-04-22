import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


const NotFound = () => {
    return (
        <div className='notfound'>
            <h1>Erreur</h1>
            <div>
                <img src={'./images/notFound.png'} alt={'Not Found'} />
            </div>
            <p>Page NotFound</p>
            <NavLink to="/" >
                <HomeIcon />Redirection accueil
            </NavLink>
        </div>
    );
};

export default NotFound;