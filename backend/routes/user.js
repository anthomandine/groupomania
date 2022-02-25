
//-------- Initialisation express et routeur ---------//

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//--------Chargement de la route vers middleware s'inscrire et se connecter---------//

router.post('/signin', userCtrl.signup);

router.post('/login', userCtrl.login);

router.get('/:userId', auth, userCtrl.getOneUser);

router.put('/:userId', auth, userCtrl.modifyUser);


module.exports = router;