const router = require('express').Router();
const { registerHR,  signIn ,logout,fetchHRDetails} = require('../controllers/hr.controller');

router.post('/register', registerHR);

router.post('/signin', signIn);

router.post('/logout', logout);

router.post('/findOneHR', fetchHRDetails);

module.exports = router;
