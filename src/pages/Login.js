import React from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Navigation from '../components/Navigation';
import HeaderComponent from '../components/HeaderComponent';
import { useState } from 'react';
import FooterComponent from '../components/FooterComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validEmail, validPassword } from '../components/Regex';



const Login = () => {

    //---------Init variables----------//

    let navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);

    //---------Verification Regex----------//

    const validate = () => {
        if (!validEmail.test(data.email)) {
            setEmailErr(true);
        }
        if (!validPassword.test(data.password)) {
            setPwdError(true);
        }
    };

    //---------Récupération des data input user----------//

    const handleChange = (e) => {
        setErrorMessage('');
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    //---------Envoi des data user----------//

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
                localStorage.setItem('userId', reponse.data.userId);
                localStorage.setItem('token', reponse.data.token);
                localStorage.setItem('isadmin', reponse.data.isadmin);
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
                                id="input-email" 
                                color="primary" 
                                variant="outlined"
                                name='email'
                                label="email"
                                helperText={emailErr ? 'Email doit être au format «toto@adresse.com»' : "Entrer votre Email"} required
                                onChange={handleChange}
                                value={data.email}
                                type="email"
                                error={emailErr}
                            />
                            <TextField
                                id="input-password" color="primary" variant="outlined"
                                label="mot de passe"
                                name='password'
                                helperText={pwdError ? 'Votre mot de passe doit contenir au moins 8 caractères, 1 nombre et 1 majuscule' : "Saisissez votre mot de passe" } required
                                onChange={handleChange}
                                value={data.password}
                                type="password"
                                error={pwdError}
                            />
                            <Button type='submit' onClick={validate}>Conexion</Button>
                            {errorMessage && (<p className="error"> {errorMessage} </p>)}
                        </form>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};
export default Login;