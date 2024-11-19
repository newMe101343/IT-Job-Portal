const router = require('express').Router();
const { 
    registerApplicant, 
    signIn,
    logout, 
    fetchApplicantDetails, 
    updatePassword, 
    updateEmail, 
    updateUsername, 
    updateGitHub,
    updateLeetcode,
    updateTwitter,
    updateStackOverflow,
    updateLinkedIn ,
    updateExperience,
    updateBachelors,
    updateMasters,
    deleteAccount,
    addSkill,
} = require('../controllers/applicant.controller');

// Register, Signin, Logout routes
router.post('/register', registerApplicant);
router.post('/signin', signIn);
router.post('/logout', logout);

// Fetch applicant details route
router.post('/findOneApplicant', fetchApplicantDetails);

// Update routes for different fields
router.post('/updatePassword', updatePassword);
router.post('/updateEmail', updateEmail);
router.post('/updateUsername', updateUsername);
router.post('/updateGitHub', updateGitHub);   // New route for GitHub update
router.post('/updateLeetcode', updateLeetcode); // New route for Leetcode update
router.post('/updateTwitter', updateTwitter); // New route for Twitter update
router.post('/updateStackOverflow', updateStackOverflow); // New route for StackOverflow update
router.post('/updateLinkedIn', updateLinkedIn); // New route for LinkedIn update
router.post('/updateExperience', updateExperience); // New route for exp[] update
router.post('/updateBachelors', updateBachelors); // New route for bach update
router.post('/updateMasters', updateMasters); // New route for masters update
router.post('/deleteAccount', deleteAccount); // New route for Delete acc
router.post('/addSkill', addSkill); // New route for Delete acc

module.exports = router;
