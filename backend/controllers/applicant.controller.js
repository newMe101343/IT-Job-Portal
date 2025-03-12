const jwt = require('jsonwebtoken');
const Applicant = require('../models/applicant.model');
const bcryptjs = require('bcryptjs');
const cloudinary = require('../config/cloudinary.config');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokens');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { log } = require('console');

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

async function sendOtp(req, res) {
    try {

        const token = req.cookies?.refreshToken;

        if (!token) {
            return res.status(400).json({ message: "Refresh token is missing" });
        }

        const applicant = await Applicant.findOne({ refreshToken: token });

        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        const otp = crypto.randomInt(100000, 999999).toString();

        applicant.otp = otp; 
        await applicant.save();

        const transporter = nodemailer.createTransport({
            service: "Gmail", // or other email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: applicant.email,
            subject: "Your Verification Code",
            text: `Your OTP for verification is: ${otp}`,
        });

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function verifyOtp(req, res) {
    try {
        const token = req.cookies?.refreshToken;
        const { otp } = req.body;
        const otpInt = parseInt(otp, 10);
      
        if (!token || !otp) {
            return res.status(400).json({ message: "Refresh token or OTP is missing" });
        }

        // Find the applicant with the refresh token
        const applicant = await Applicant.findOne({ refreshToken: token });

        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        console.log(applicant.otp+"  "+otp);
        
        // Verify OTP
        if (applicant.otp !== otpInt) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        applicant.isVerified = true;
        applicant.otp = undefined; // Clear OTP after verification
        await applicant.save();

        return res.status(200).json({ message: "Verification successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



// Register Applicant
const registerApplicant = async (req, res) => {
    const { name, username, email, password } = req.body;
    const profilePicture = req.file?.path;
    // console.log(req.file?.path)
    // console.log(req.file?.filename)
    console.log("Request received for applicant registration");

    if (!name || !username || !email || !password) {
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
            profilePicture: req.file?.filename
        });

        await newApplicant.save();

        // console.log(`New applicant registered: ${newApplicant}`);
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
        // console.log("Received token:", token);

        // Find the user by the refresh token
        const user = await Applicant.findOne({ refreshToken: token });

        if (!user) {
            return res.status(404).json({ message: 'User not found or invalid token' });
        }

        const { password, ...userDetails } = user._doc; // Exclude password from the response

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
        user.isVerified = false;
        await user.save();

        return res.status(200).json({ message: 'Email updated successfully.' });
    } catch (err) {
        console.error('Error updating email:', err);
        return res.status(500).json({ message: 'Error updating email.', error: err.message });
    }
};

//Update username
const updateUsername = async (req, res) => {
    try {
        const { newUsername } = req.body;
        const token = req.cookies?.refreshToken;
        const user = await Applicant.findOne({ refreshToken: token });

        user.username = newUsername;
        await user.save();

        return res.status(200).json({ message: 'Username updated successfully.' });
    } catch (err) {
        console.error('Error updating Email:', err);
        return res.status(500).json({ message: 'Error updating Username.', error: err.message });
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

        return res.status(200).json({ message: 'Experience updated successfully.' });
    } catch (err) {
        console.error('Error updating Exp:', err);
        return res.status(500).json({ message: 'Error updating Exp.', error: err.message });
    }
};

// update GitHub, Leetcode, Twitter, StackOverflow, LinkedIn, Experience and Degree Details
const updateDetails = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;
        const applicant = await Applicant.findOne({ refreshToken: token });
        if (!applicant) {
            return res.status(404).json({ messsage: "Applicant Not Found || Not Authenticated" })
        }

        const { newGitHub, newLeetcode, newTwitter, newStackOverflow, newLinkedIn, newBachelors , newMasters } = req.body;
        

        if (newGitHub) { applicant.GitHub = newGitHub }
        if (newLeetcode) { applicant.LeetCode = newLeetcode }
        if (newTwitter) { applicant.Twitter = newTwitter }
        if (newStackOverflow) { applicant.StackOverflow = newStackOverflow }
        if (newLinkedIn) { applicant.LinkedIn = newLinkedIn }
        if (newBachelors) { applicant.bachelors = newBachelors }
        if (newMasters) { applicant.masters = newMasters }

        await applicant.save();
        return res.status(200).json({ message: 'Applicant details Updated successfully', applicant });

    } catch (err) {
        console.log(err.message);
        
        return res.status(500).json({ message: 'Error Updating Applicant details', error: err.message });
    }
}

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
        return res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};

//Add Skill
const addSkill = async (req, res) => {
    try {
        const { newSkill } = req.body;
        const token = req.cookies?.refreshToken;
        const updatedUser = await Applicant.findOneAndUpdate(
            { refreshToken: token },
            { $addToSet: { techStack: newSkill } },
            { new: true } // Return the updated document
        );

        await updatedUser.save();

        return res.status(200).json({ message: 'Skill Added successfully.',updatedUser });
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
    updateDetails,
    updateUsername,
    deleteAccount,
    addSkill,
    updateExperience,
    verifyOtp,
    sendOtp
};

