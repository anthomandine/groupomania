import React from 'react';
import BackHome from '../components/BackHome';
import HeaderComponent from '../components/HeaderComponent';
import NetworkHeaderComponent from '../components/NetworkHeaderComponent';
import PostAddView from '../components/PostAddView';
import PostView from '../components/PostView';






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