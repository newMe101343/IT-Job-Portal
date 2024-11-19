const router = require('express').Router();
const { registerHR,  signIn ,logout,fetchHRDetails, updatePassword, updateEmail, updateUsername} = require('../controllers/hr.controller');

router.post('/register', registerHR);
router.post('/signin', signIn);
router.post('/logout', logout);

router.post('/findOneHR', fetchHRDetails);

router.post('/updatePassword', updatePassword);
router.post('/updateEmail', updateEmail);
router.post('/updateUsername', updateUsername);

module.exports = router;
