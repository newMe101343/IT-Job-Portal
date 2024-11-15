const Applicant = require('../models/applicant.model');

// Controller for applicant registration
const registerApplicant = async (req, res) => {
    const { name, username , email, password  } = req.body;
    console.log("Request received");

    try {
            // Create a new Applicant instance
            const newApplicant = new Applicant({
                name,
                username,
                email,
                password, // In practice, hash the password before saving
                qualifications: null,
                techStack: null,
                experience: null,
                projectPortfolio: [],
            });
            
            // Save to the database
            await newApplicant.save();
            console.log(await Applicant.find());
            
            // Respond with success
            res.status(201).json({ message: 'Applicant registered successfully!', applicant: newApplicant });
        
    } catch (error) {
        console.error('Error registering applicant:', error);
        res.status(500).json({ message: 'Error registering applicant', error });
    }
};

// Placeholder for another route
const anotherRouteHandler = (req, res) => {
    // Logic for another route
    res.status(200).json({ message: 'This is another route!' });
};

module.exports = {
    registerApplicant,
    anotherRouteHandler,
};
