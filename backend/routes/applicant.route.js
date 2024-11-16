const router = require('express').Router();
const { registerApplicant,  signIn ,logout , fetchApplicantDetails } = require('../controllers/applicant.controller');

router.post('/register', registerApplicant);

router.post('/signin', signIn);

router.post('/logout',logout);

router.post('/findOneApplicant',fetchApplicantDetails);

module.exports = router;
