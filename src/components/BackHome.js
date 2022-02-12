import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


const BackHome = () => {
    return (
        <div className='backhome'>
            <NavLink to="/">
                <HomeIcon />
            </NavLink>
        </div>
    );
};


export default BackHome;