const router = require('express').Router();
const { registerHR, signIn, logout, fetchHRDetails, updatePassword, updateEmail, updateUsername, updateCompany, updateCompanyCategory, updateCompanyWebsite, deleteAcc } = require('../controllers/hr.controller');
const upload = require('../middlewares/multer.middleware');

router.post('/register', upload.single('profilePicture'), registerHR);
router.post('/signin', signIn);
router.post('/logout', logout);

router.post('/findOneHR', fetchHRDetails);

router.post('/updatePassword', updatePassword);
router.post('/updateEmail', updateEmail);
router.post('/updateUsername', updateUsername);

router.post('/updateCompany', updateCompany)
router.post('/updateCompanyCategory', updateCompanyCategory)
router.post('/updateCompanyWebsite', updateCompanyWebsite)


router.post('/deleteAccount', deleteAcc)

module.exports = router;
