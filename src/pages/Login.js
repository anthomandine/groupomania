import React from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Navigation from '../components/Navigation';
import HeaderComponent from '../components/HeaderComponent';

import { useState } from 'react';
import FooterComponent from '../components/FooterComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    let navigate = useNavigate();

    const [ data, setData ] = useState ({ 
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState('');
    
    const handleChange = (e) => {
        setErrorMessage('');
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
            password: data.password
        };

        axios({
            method: 'post',
            url: 'http://localhost:3000/api/auth/login',
            data: userData
        })
        .then(function (reponse) {
            sessionStorage.setItem('userId', reponse.data.userId);
            sessionStorage.setItem('token', reponse.data.token);

            navigate(`/Network`);
            window.location.reload();
        })
        .catch(function (err) {
            setErrorMessage('Email ou mot de passe incorrect ! ');
        });
    };

    return (
        <>
            <HeaderComponent />
            <Navigation />
            <div className='login'>
                <div className='box-login'>
                    <h1>Se connecter</h1>
                    <div className='box-input'>
                        <form method="post" onSubmit={handleSubmit}>
                            <TextField 
                                id="input-email" label="email" color="warning" variant="outlined" 
                                name='email'
                                helperText="Entrer votre Email" required
                                onChange={handleChange}
                                value={data.email}
                                type="email"
                            />
                            <TextField
                                id="input-password" label="password" color="warning" variant="outlined" 
                                name='password'
                                helperText="Saisissez votre mot de passe" required
                                onChange={handleChange}
                                value={data.password}
                                type="password"
                            />
                            {errorMessage && ( <p className="error"> {errorMessage} </p> )}
                            <Button type='submit'>Conexion</Button>
                        </form>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};
export default Login;