
import React from 'react';
import BackHome from '../components/BackHome';
import HeaderComponent from '../components/HeaderComponent';
import NetworkHeaderComponent from '../components/NetworkHeaderComponent';
import PostAddView from '../components/PostAddView';
import PostView from '../components/PostView';
import axios from 'axios';



const userId = sessionStorage.getItem('userId');
    axios.get('http://localhost:3000/api/'+userId)
    .then(function (reponse) {
        const pseudo = reponse.data[0].pseudo;
        console.log(pseudo);
    });



const Network = () => {

    
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