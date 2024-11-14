const  router = require('express').Router()
const applicant = require('../models/applicant.model')

//Inital register for applicant
router.post('/register', async (req, res) => {
    
    const { name, email, password } = req.body;
    console.log("request recieved");
    
    try {
        // Create a new Applicant instance
        const newApplicant = new applicant({
            name,
            email,
            password, // In practice, hash the password before saving
            qualifications: null,
            techStack: null,
            experience: null,
            projectPortfolio: [],
        });

        // Save to the database
        await newApplicant.save();
        console.log(await applicant.find());
        

        // Respond with success
        res.status(201).json({ message: 'Applicant registered successfully!', applicant: newApplicant });
    } catch (error) {
        console.error('Error registering applicant:', error);
        res.status(500).json({ message: 'Error registering applicant', error });
    }
});



router.get('/another-route' , (req , res)=>{
    // router code here
})

module.exports  = router;