const router = require('express').Router();
const { registerHR,  signIn } = require('../controllers/hr.controller');

router.post('/register', registerHR);

router.post('/signin', signIn);

module.exports = router;
