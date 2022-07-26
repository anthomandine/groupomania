//-------- Initialisation express, package et routes ---------//

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const app = express();

//-------Acceptation cross platform---------//
app.use(cors())

//--------Chargement de la fonction bodyParser(analyseur de corps de requête)---------//

app.use(bodyParser.json());
app.use(express.json());

//--------Demande URL vers l'arboraissance des images---------//

app.use('/images', express.static(path.join('/home/asanna/www/groupomania/backend/', 'images')));

//--------Demande URL vers les routes inscription et connexion  ---------//

app.use('/api/auth', userRoutes);

//--------Demande URL vers les routes network  ---------//

app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;

//bash: npm install
//bash: npm install body-parser

