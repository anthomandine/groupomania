
import React from 'react';
import BackHome from '../components/BackHome';
import HeaderComponent from '../components/HeaderComponent';
import NetworkHeaderComponent from '../components/NetworkHeaderComponent';
import PostAddView from '../components/PostAddView';
import PostView from '../components/PostView';
import axios from 'axios';


const Network = () => {

    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');

    axios.get('http://localhost:3000/api/auth/'+userId,
    {
        headers: {
        'Authorization': 'Bearer ' + token
    }
      })
    .then(function (reponse) {
        const pseudo = reponse.data[0].pseudo;
        sessionStorage.setItem('user', pseudo);
    });

    return (
        <div>
            <BackHome />
            <HeaderComponent />
            <NetworkHeaderComponent />
            <PostAddView />
            <PostView />
        </div>
    );
};

export default Network;