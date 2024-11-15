const router = require('express').Router();
const { registerApplicant,  signIn } = require('../controllers/applicant.controller');

router.post('/register', registerApplicant);

router.post('/signin', signIn);

module.exports = router;
