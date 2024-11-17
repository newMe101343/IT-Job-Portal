const router = require('express').Router();
const { registerApplicant,  signIn ,logout , fetchApplicantDetails , updatePassword } = require('../controllers/applicant.controller');

router.post('/register', registerApplicant);

router.post('/signin', signIn);

router.post('/logout',logout);

router.post('/findOneApplicant',fetchApplicantDetails);

router.post('/updatePassword',updatePassword);

module.exports = router;
