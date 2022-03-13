
//-------- Initialisation express et routeur ---------//

const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

//--------Chargement des routes vers middleware---------//

router.post('/', auth, commentCtrl.createComment);

router.delete('/:idcomment', auth, commentCtrl.deletComment);

module.exports = router;