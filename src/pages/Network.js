
import React, { useEffect, useState } from 'react';
import BackHome from '../components/BackHome';
import HeaderComponent from '../components/HeaderComponent';
import NetworkHeaderComponent from '../components/NetworkHeaderComponent';
import PostAddView from '../components/PostAddView';
import PostView from '../components/PostView';
import axios from 'axios';
import CachedIcon from '@mui/icons-material/Cached';
import { IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import FooterComponent from '../components/FooterComponent';
import { URL } from '../App';

const Network = () => {

    //---------Init variables----------//

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const [isload, setisload] = useState(false);

    function isLoadF() {
        setisload(!isload)
    };

    const [profilLoad, setProfilLoad] = useState(false);

    function isProfilLoad() {
        setProfilLoad(!profilLoad)
    };


    //---------condition connexion ----------//

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.length === 0) {
            navigate(`/`);
        };
        // eslint-disable-next-line
    }, [])

    //---------Récupération des données user----------//

    axios.get(URL + '/api/auth/' + userId,
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (reponse) {
            const pseudo = reponse.data[0].pseudo;
            const avatar = reponse.data[0].avatar;

            localStorage.setItem('user', pseudo);
            localStorage.setItem('avatar', avatar);
        })
        .catch(function (err) {
            console.log(err);
            localStorage.clear();
            navigate(`/`);
        });

    return (
        <div>
            <BackHome />
            <HeaderComponent />
            <NetworkHeaderComponent
                isLoadF={isLoadF}
                isload={isload}
                profilLoad={profilLoad}
                isProfilLoad={isProfilLoad}
            />
            <div className='refresh'>
                <IconButton onClick={() => window.location.reload()}>
                    <CachedIcon />actualiser</IconButton>
            </div>
            <PostAddView isLoadF={isLoadF} isload={isload} />
            <FooterComponent />
            <PostView isLoadF={isLoadF} isload={isload} />
        </div>
    );
};

export default Network;