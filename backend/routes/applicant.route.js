const router = require('express').Router();
const { registerApplicant,  signIn ,logout } = require('../controllers/applicant.controller');

router.post('/register', registerApplicant);

router.post('/signin', signIn);

router.post('/logout',logout);

module.exports = router;
