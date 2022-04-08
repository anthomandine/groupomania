import React from 'react';
import { Alert, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
import HeaderComponent from '../components/HeaderComponent';
import Navigation from '../components/Navigation';
import FooterComponent from '../components/FooterComponent';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { validEmail, validPassword, validPseudo } from '../components/Regex';

const SignIn = () => {

    //---------Init variables----------//

    let navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [pseudoError, setPseudoError] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        pseudo: ""
    });
    const [avatar, setAvatar] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const avatars = [
        "../images/avatar/1.png",
        "../images/avatar/2.png",
        "../images/avatar/3.png",
        "../images/avatar/4.png",
        "../images/avatar/5.png",
        "../images/avatar/6.png",
        "../images/avatar/7.png",
        "../images/avatar/8.png",
        "../images/avatar/9.png"
    ];

    //---------Verification Regex----------//

    const validate = () => {
        if (!validEmail.test(data.email)) {
            setEmailErr(true);
        }
        if (!validPassword.test(data.password)) {
            setPwdError(true);
        }
        if (!validPseudo.test(data.pseudo)) {
            setPseudoError(true);
        }
    };

    //---------Récupération data input user----------//

    const handleChange = (e) => {
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
            password: data.password,
            pseudo: data.pseudo,
            avatar: avatars[avatar]
        };
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/auth/signin',
            data: userData
        })
            .then(function (reponse) {
                console.log("profil créé!");
                setConfirm(true);
                setTimeout(() => navigate(`/Login`), 2000);

            })
            .catch(function (erreur) {
                setErrorMessage('Email déjà utilisé');
            });
    };

    return (
        <>
            <HeaderComponent />
            <Navigation />
            <div className='signin'>
                <div className='box-signin'>
                    <h1>Inscription</h1>
                    <div className='box-input'>
                        <form methode='post' onSubmit={handleSubmit}>
                            <TextField
                                id="input-email" required
                                name="email"
                                label="email" 
                                color="warning" 
                                variant="outlined"
                                helperText={emailErr ? 'Email non valide' : "Entrer votre Email"}
                                onChange={handleChange}
                                value={data.email}
                                type="email"
                            />
                            <TextField
                                id="input-password" required
                                name="password"
                                label="password" color="warning" variant="outlined"
                                helperText={pwdError ? 'Password non valide' : "Saisissez votre mot de passe"}
                                onChange={handleChange}
                                value={data.password}
                                type="password"
                            />
                            <TextField
                                id="input-pseudo" required
                                name="pseudo"
                                label="pseudo" color="warning" variant="outlined"
                                helperText={pseudoError ? 'Pseudo non valide' : "Saisissez votre Pseudo"} 
                                onChange={handleChange}
                                value={data.pseudo}
                            />
                            <p className='avatar-text'>Choisissez un avatar :</p>
                            <div className='avatar-content'>
                                {avatars.map((avatarUrl, index) => (
                                    <IconButton key={index} onClick={() => setAvatar(index)} className={index === avatar ? 'active' : ''}>
                                        <Avatar alt="avatar-1" src={avatars[index]} />
                                    </IconButton>
                                ))}
                            </div>
                            {confirm ? <Alert severity="success">Inscription terminée veuillez vous connecter</Alert> : ""}
                            {errorMessage && (<p className="error"> {errorMessage} </p>)}
                            <Button type='submit' onClick={validate}>Valider</Button>
                        </form>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default SignIn;