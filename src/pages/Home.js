import React, { useEffect } from 'react';
import FooterComponent from '../components/FooterComponent';
import Navigation from '../components/Navigation';
import { useNavigate } from "react-router-dom";

const Home = () => {

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.length > 0) {
            navigate(`/network`);
        };
        // eslint-disable-next-line
    }, [])

    return (
        <div className="home">
            <Navigation />
            <div className='box-img'>
                <img src='./images/icon-above-font-dec.png' alt='logo'></img>
            </div>
            <h1>BIENVENUE</h1>
            <p>Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons actuellement
                plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions uniquement
                300 il y a 3 ans.</p>
            <FooterComponent />
        </div>
    )
}

export default Home;