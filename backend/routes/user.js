
//-------- Initialisation express et routeur ---------//

const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user');

//--------Chargement de la route vers middleware s'inscrire et se connecter---------//

router.post('/signin', userCtrl.signup);

router.post('/login', userCtrl.login);


module.exports = router;