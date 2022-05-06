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
import { URL } from '../App';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const SignIn = () => {

    //---------Init variables----------//

    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailErr, setEmailErr] = useState();
    const [pwdError, setPwdError] = useState();
    const [pseudoError, setPseudoError] = useState();
    const [focusEmail, setFocusEmail] = useState(false);
    const [focusPwd, setFocusPwd] = useState(false);
    const [focusPseudo, setFocusPseudo] = useState(false);
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
    const [showPassword, setShowPassword] = useState(false);

    //---------Verification Regex----------//

    const validate = () => {
        if (!validEmail.test(data.email)) { setEmailErr(true); }
        else { setEmailErr(false); }
        if (!validPassword.test(data.password)) { setPwdError(true); }
        else { setPwdError(false); }
        if (!validPseudo.test(data.pseudo)) { setPseudoError(true); }
        else { setPseudoError(false); }
    };

    //---------Récupération data input user----------//

    const handleChange = (e) => {
        const value = e.target.value;

        if (e.target.name === 'email') {
            if (validEmail.test(value)) {
                setFocusEmail(true);
                setEmailErr(false);
            }
            else { setFocusEmail(false); setEmailErr(true); }
        }
        if (e.target.name === 'password') {
            if (validPassword.test(value)) {
                setFocusPwd(true);
                setPwdError(false);
            }
            else { setFocusPwd(false); setPwdError(true); }
        }
        if (e.target.name === 'pseudo') {
            if (validPseudo.test(value)) {
                setFocusPseudo(true);
                setPseudoError(false);
            }
            else { setFocusPseudo(false); setPseudoError(true); }
        }

        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    //---------Envoi des data user----------//

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validEmail.test(data.email) && validPassword.test(data.password) && validPseudo.test(data.pseudo)) {
            const userData = {
                email: data.email,
                password: data.password,
                pseudo: data.pseudo,
                avatar: avatars[avatar]
            };
            axios({
                method: 'post',
                url: URL + '/api/auth/signin',
                data: userData
            })
                .then(function (reponse) {
                    console.log("profil créé!");
                    setConfirm(true);
                    setTimeout(() => navigate(`/login`), 2000);

                })
                .catch(function (erreur) {
                    setErrorMessage('Email déjà utilisé');
                });
        }
        else {
            return;
        }
    };

    return (
        <>
            <HeaderComponent />
            <Navigation />
            <div className='signin'>
                <div className='box-signin'>
                    <h1>Inscription</h1>
                    <div className='box-input'>
                        <form methode='post' onSubmit={handleSubmit} style={{ position: 'relative' }}>
                            <TextField
                                id="input-email"
                                required
                                name="email"
                                label="email"
                                color={focusEmail ? "success" : "primary"}
                                variant="outlined"
                                helperText={emailErr ? 'Email doit être au format «toto@adresse.com»' : "Entrer votre Email"}
                                onChange={handleChange}
                                value={data.email}
                                type="email"
                                error={emailErr}
                            />
                            <TextField
                                id="input-password"
                                required
                                name="password"
                                label="password"
                                color={focusPwd ? "success" : "primary"}
                                variant="outlined"
                                helperText={pwdError ? 'Votre mot de passe doit contenir au moins 8 caractères, 1 nombre et 1 majuscule' : "Saisissez votre mot de passe"}
                                onChange={handleChange}
                                value={data.password}
                                type={showPassword ? "text" : "password"}
                                error={pwdError}
                            />
                            {showPassword ?
                                <VisibilityOffIcon
                                    color='action'
                                    fontSize='small'
                                    onClick={() => { setShowPassword(!showPassword); }}
                                    style={{ cursor: 'pointer', position: 'absolute', right: 25, bottom: 110 }} />
                                :
                                <VisibilityIcon
                                    color='action'
                                    fontSize='small'
                                    onClick={() => { setShowPassword(!showPassword); }}
                                    style={{ cursor: 'pointer', position: 'absolute', right: 25, bottom: 110 }} />}

                            <TextField
                                id="input-pseudo"
                                required
                                name="pseudo"
                                label="pseudo"
                                color={focusPseudo ? "success" : "primary"}
                                variant="outlined"
                                helperText={pseudoError ? 'Pseudo non valide' : "Saisissez votre Pseudo"}
                                onChange={handleChange}
                                value={data.pseudo}
                                error={pseudoError}
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