//-------- Initialisation express, package et routes ---------//

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');
const app = express();


//-------Acceptation cross platform---------//

app.use(cors())

//--------Chargement de la fonction bodyParser(analyseur de corps de requête)---------//

app.use(bodyParser.json());
app.use(express.json());

//--------Demande URL vers l'arboraissance des images---------//


//--------Demande URL vers les routes inscription et connexion  ---------//

app.use('/signin', userRoutes);
app.use('/login', userRoutes);

//--------Demande URL vers les routes network  ---------//


  module.exports = app;

//bash: npm install
//bash: npm install body-parser

