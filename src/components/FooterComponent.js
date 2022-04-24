import React from 'react';
import UseAnimations from "react-useanimations";
import facebook from "react-useanimations/lib/facebook";
import twitter from "react-useanimations/lib/twitter";
import instagram from "react-useanimations/lib/instagram";
import linkedin from "react-useanimations/lib/linkedin";
import mail from "react-useanimations/lib/mail";


const FooterComponent = () => {
    return (
        <div className='footer'>
            <p>Suivez le groupe Groupomania sur nos réseaux : </p>
            <div className='link'>
                <UseAnimations
                    strokeColor={'blue'}
                    animation={facebook} size={40}
                    wrapperStyle={{ cursor: 'pointer', padding: 8 }}
                    onClick={() => window.open("https://fr-fr.facebook.com/", "_blank")}
                />
                <UseAnimations
                    strokeColor={'#2196f3'}
                    animation={twitter} size={40}
                    wrapperStyle={{ cursor: 'pointer', padding: 8 }}
                    onClick={() => window.open("https://twitter.com/?lang=fr", "_blank")}
                />
                <UseAnimations
                    strokeColor={'red'}
                    animation={instagram} size={40}
                    wrapperStyle={{ cursor: 'pointer', padding: 8 }}
                    onClick={() => window.open("https://www.instagram.com/?hl=fr", "_blank")}
                />
                <UseAnimations
                    strokeColor={'blue'}
                    animation={linkedin} size={40}
                    wrapperStyle={{ cursor: 'pointer', padding: 8 }}
                    onClick={() => window.open("https://fr.linkedin.com/", "_blank")}
                />
                <UseAnimations
                    strokeColor={'orange'}
                    animation={mail} size={40}
                    wrapperStyle={{ cursor: 'pointer', padding: 8 }}
                    onClick={() => window.open("mailto:groupomania@test.com")}
                />
            </div>
        </div>
    );
};

export default FooterComponent;