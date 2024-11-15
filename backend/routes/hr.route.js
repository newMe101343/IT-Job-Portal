const router = require('express').Router();
const { registerHR,  signIn ,logout} = require('../controllers/hr.controller');

router.post('/register', registerHR);

router.post('/signin', signIn);

router.post('/logout', logout);

module.exports = router;
