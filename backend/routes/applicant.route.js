const router = require('express').Router();
const upload = require('../middlewares/multer.middleware');
const {
    registerApplicant,
    signIn,
    logout,
    fetchApplicantDetails,
    updatePassword,
    updateEmail,
    updateUsername,
    deleteAccount,
    addSkill,
    updateDetails,
} = require('../controllers/applicant.controller');

router.post('/register', upload.single('profilePicture'), registerApplicant);
router.post('/signin', signIn);
router.post('/logout', logout);

router.post('/findOneApplicant', fetchApplicantDetails);

router.post('/updatePassword', updatePassword);
router.post('/updateEmail', updateEmail);
router.post('/updateUsername', updateUsername);

router.post('/updateDetails', updateDetails);
router.post('/addSkill', addSkill);

router.post('/deleteAccount', deleteAccount);

module.exports = router;
