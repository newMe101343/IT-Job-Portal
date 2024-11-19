const jwt = require('jsonwebtoken');
const Applicant = require('../models/applicant.model');
const bcryptjs = require('bcryptjs');
const cloudinary = require('../config/cloudinary.config');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokens');

// Generate Access and Refresh Tokens
async function generateAccessAndRefreshToken(_id) {
    try {
        const user = await Applicant.findById(_id); // Use findById for MongoDB
        if (!user) {
            throw new Error("User not found");
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new Error("Token generation failed");
    }
}

// Register Applicant
const registerApplicant = async (req, res) => {
    const { name, username, email, password } = req.body;
    const profilePicture = req.file?.path;
    console.log(req.file?.path)
    console.log(req.file?.filename)
    console.log("Request received for applicant registration");

    if (!name || !username || !email || !password) {
        console.log(req.body);
        console.log(req.headers);

        return res.status(400).json({ message: `'All fields are required'` });
    }

    try {
        const existingUser = await Applicant.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or Username already taken' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newApplicant = new Applicant({
            name,
            username,
            email,
            password: hashedPassword,
            profilePicture : req.file?.filename
        });

        await newApplicant.save();

        console.log(`New applicant registered: ${newApplicant}`);
        res.status(201).json({
            message: 'Applicant registered successfully!',
            applicant: { newApplicant },
        });
    } catch (error) {
        console.error('Error registering applicant:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Sign-In
const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await Applicant.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: `User with ${email} not registered` });
        }

        const isPasswordMatched = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: `Invalid email or password` });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure in production
            sameSite: 'strict',
            path: '/', // Explicit path
        };

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .cookie("accessToken", accessToken, cookieOptions)
            .json({ message: "Sign in successful", user, refreshToken, accessToken });

    } catch (error) {
        console.error('Error signing in applicant:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// LogOut
const logout = async (req, res) => {
    console.log("Logout request hit");

    try {
        const token = req.cookies?.refreshToken || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(400).json({ message: 'No refresh token provided' });
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        const user = await Applicant.findById(decodedToken._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.refreshToken = null;
        await user.save();

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/', // Explicit path
        };

        res.clearCookie('refreshToken', cookieOptions);
        res.clearCookie('accessToken', cookieOptions);

        return res.status(200).json({ message: 'User logged out successfully' });

    } catch (err) {
        console.error('Error logging out user:', err);
        return res.status(500).json({ message: 'Error logging out user' });
    }
};


//fetch user details
const fetchApplicantDetails = async (req, res) => {


    try {
        // Get the token from the cookies
        const token = req.cookies?.refreshToken;

        if (!token) {
            console.log("No token found");
            return res.status(400).json({ message: 'No refresh token provided' });
        }

        console.log("Received token:", token); // Log the token

        // Find the user by the refresh token
        const user = await Applicant.findOne({ refreshToken: token });

        if (!user) {
            return res.status(404).json({ message: 'User not found or invalid token' });
        }

        const { password, ...userDetails } = user._doc; // Exclude password from the response
        console.log('User found:', userDetails); // Log the user details returned

        // Send response
        return res.status(200).json(userDetails);
    } catch (err) {
        console.error('Error fetching user details:', err);
        return res.status(500).json({ message: 'Error fetching user details', error: err.message });
    }
};

//Update Password
const updatePassword = async (req, res) => {
    try {
        const { newPass } = req.body;
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        const hashedPassword = await bcryptjs.hash(newPass, 10); // Salt rounds = 10
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully.' });
    } catch (err) {
        console.error('Error updating password:', err);
        return res.status(500).json({ message: 'Error updating password.', error: err.message });
    }
};

//Update Email
const updateEmail = async (req, res) => {
    try {
        const { newEmail } = req.body;
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        user.email = newEmail;
        await user.save();

        return res.status(200).json({ message: 'Email updated successfully.' });
    } catch (err) {
        console.error('Error updating email:', err);
        return res.status(500).json({ message: 'Error updating email.', error: err.message });
    }
};

//Update Password
const updateUsername = async (req, res) => {
    try {
        const { newUsername } = req.body;
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        user.username = newUsername;
        await user.save();

        return res.status(200).json({ message: 'Email updated successfully.' });
    } catch (err) {
        console.error('Error updating Email:', err);
        return res.status(500).json({ message: 'Error updating Email.', error: err.message });
    }
};

//Update Github
const updateGitHub = async (req, res) => {
    try {
        const { newGitHub } = req.body;
        console.log(newGitHub);
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        user.GitHub = newGitHub;
        await user.save();

        return res.status(200).json({ message: 'GitHub profile updated successfully.' });
    } catch (err) {
        console.error('Error updating GitHub:', err);
        return res.status(500).json({ message: 'Error updating GitHub.', error: err.message });
    }
};

//Update Leetcode
const updateLeetcode = async (req, res) => {
    try {
        const { newLeetcode } = req.body;
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        user.LeetCode = newLeetcode;
        await user.save();

        return res.status(200).json({ message: 'Leetcode profile updated successfully.' });
    } catch (err) {
        console.error('Error updating Leetcode:', err);
        return res.status(500).json({ message: 'Error updating Leetcode.', error: err.message });
    }
};

//update Twitter
const updateTwitter = async (req, res) => {
    try {
        const { newTwitter } = req.body;
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        user.Twitter = newTwitter;
        await user.save();

        return res.status(200).json({ message: 'Twitter handle updated successfully.' });
    } catch (err) {
        console.error('Error updating Twitter:', err);
        return res.status(500).json({ message: 'Error updating Twitter.', error: err.message });
    }
};

//Update StackOverflow
const updateStackOverflow = async (req, res) => {
    try {
        const { newStackOverflow } = req.body;
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        user.StackOverflow = newStackOverflow;
        await user.save();

        return res.status(200).json({ message: 'StackOverflow profile updated successfully.' });
    } catch (err) {
        console.error('Error updating StackOverflow:', err);
        return res.status(500).json({ message: 'Error updating StackOverflow.', error: err.message });
    }
};

//Update LInked in
const updateLinkedIn = async (req, res) => {
    try {
        const { newLinkedIn } = req.body;
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        user.LinkedIn = newLinkedIn;
        await user.save();

        return res.status(200).json({ message: 'LinkedIn profile updated successfully.' });
    } catch (err) {
        console.error('Error updating LinkedIn:', err);
        return res.status(500).json({ message: 'Error updating LinkedIn.', error: err.message });
    }
};

//Update Experience
const updateExperience = async (req, res) => {
    try {
        const { newExperience } = req.body;
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        user.experience = newExperience;
        await user.save();

        return res.status(200).json({ message: 'Experience profile updated successfully.' });
    } catch (err) {
        console.error('Error updating Experience:', err);
        return res.status(500).json({ message: 'Error updating Experience.', error: err.message });
    }
};

//Update Bachelors
const updateBachelors = async (req, res) => {
    try {
        const { newBachelors } = req.body;
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        user.bachelors = newBachelors;
        await user.save();

        return res.status(200).json({ message: 'Bachelors profile updated successfully.' });
    } catch (err) {
        console.error('Error updating Bachelors:', err);
        return res.status(500).json({ message: 'Error updating Bachelors.', error: err.message });
    }
};

//Update Masters
const updateMasters = async (req, res) => {
    try {
        const { newMasters } = req.body;
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        user.masters = newMasters;
        await user.save();

        return res.status(200).json({ message: 'Masters profile updated successfully.' });
    } catch (err) {
        console.error('Error updating Masters:', err);
        return res.status(500).json({ message: 'Error updatingMasters.', error: err.message });
    }
};

//Delete Acc
const deleteAccount = async (req, res) => {
    try {

        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });
        const imagePublicId = user.profilePicture; // Retrieve the public_id from the user's document
        console.log(user.profilePicture)

        if (imagePublicId) {
            // Delete the image from Cloudinary
            const result = await cloudinary.uploader.destroy(imagePublicId);
            console.log('Cloudinary Deletion Result:', result);
        }

        await Applicant.deleteOne({ refreshToken: token }); 
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/', // Explicit path
        };

        res.clearCookie('refreshToken', cookieOptions);
        res.clearCookie('accessToken', cookieOptions);

        return res.status(200).json({ message: 'User and related images Deleted ' });
    } catch (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ message: 'Error deletign user', error: err.message });
    }
};

//Add Skill
const addSkill = async (req, res) => {
    try {
        const { newSkill } = req.body;
        const token = req.cookies?.refreshToken;
        const updatedUser = await Applicant.findOneAndUpdate(
            { refreshToken: token }, // Find user by refresh token
            { $addToSet: { techStack: newSkill } }, // Add newSkill to techStack if not already present
            { new: true } // Return the updated document
        );


        await updatedUser.save();

        return res.status(200).json({ message: 'Skill Added successfully.' });
    } catch (err) {
        console.error('Error adding skill:', err);
        return res.status(500).json({ message: 'Error addinbg skill.', error: err.message });
    }
};



module.exports = {
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
    updateLinkedIn,
    updateExperience,
    updateBachelors,
    updateMasters,
    deleteAccount,
    addSkill,
};

