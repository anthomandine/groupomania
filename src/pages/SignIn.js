import React from 'react';
import { IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import BackHome from '../components/BackHome';
import HeaderComponent from '../components/HeaderComponent';
import Navigation from '../components/Navigation';
import FooterComponent from '../components/FooterComponent';
import { useState } from 'react';

import { Avatar } from '@mui/material';

import axios from 'axios';

import { useNavigate } from "react-router-dom";


const SignIn = () => {

    let navigate = useNavigate();

    const [ data, setData ] = useState ({ 
        email: "",
        password: "",
        pseudo: ""
    });
    
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: data.email,
            password: data.password,
            pseudo: data.pseudo
        };

        axios({
            method: 'post',
            url: 'http://localhost:3000/SignIn/signin',
            data: userData
        })
        .then(function (reponse) {
            navigate(`/Network`);
        })
        .catch(function (erreur) {
            console.log(erreur);
        });


    };

    return (
        <>
             <HeaderComponent />
             <Navigation />
             <BackHome />
            <div className='signin'>
                <div className='box-signin'>
                    <h1>Inscription</h1>
                    <div className='box-input'>
                        <form methode='post' onSubmit={handleSubmit}>
                            <TextField 
                                id="input-email" required 
                                name="email"
                                label="email" color="warning" variant="outlined" 
                                helperText="Entrer votre Email"
                                onChange={handleChange}
                                value={data.email}
                                type="email"
                            />
                            <TextField
                                id="input-password" required 
                                name="password"
                                label="password" color="warning" variant="outlined"
                                helperText="Saisissez votre mot de passe"
                                onChange={handleChange}
                                value={data.password}
                                type="password"
                            />
                            <TextField
                                id="input-pseudo" required 
                                name="pseudo"
                                label="pseudo" color="warning" variant="outlined" 
                                helperText="Saisissez votre Pseudo"
                                onChange={handleChange}
                                value={data.pseudo}
                            />
                            <p className='avatar-text'>Choisissez un avatar :</p>
                            <div className='avatar-content'>
                                <IconButton><Avatar alt="avatar-1" src="../images/avatar/1.png" /></IconButton>
                                <IconButton><Avatar alt="avatar-2" src="../images/avatar/2.png" /></IconButton>
                                <IconButton><Avatar alt="avatar-3" src="../images/avatar/3.png" /></IconButton>
                                <IconButton><Avatar alt="avatar-4" src="../images/avatar/4.png" /></IconButton>
                                <IconButton><Avatar alt="avatar-5" src="../images/avatar/5.png" /></IconButton>
                                <IconButton><Avatar alt="avatar-6" src="../images/avatar/6.png" /></IconButton>
                                <IconButton><Avatar alt="avatar-7" src="../images/avatar/7.png" /></IconButton>
                                <IconButton><Avatar alt="avatar-8" src="../images/avatar/8.png" /></IconButton>
                                <IconButton><Avatar alt="avatar-9" src="../images/avatar/9.png" /></IconButton>
                            </div>
                            <Button type='submit'>Valider</Button>
                        </form>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};



export default SignIn;