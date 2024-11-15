const jwt = require('jsonwebtoken');
const Applicant = require('../models/applicant.model');
const bcryptjs = require('bcryptjs');
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
    console.log("Request received for applicant registration");

    if (!name || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
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
        });

        await newApplicant.save();

        console.log(`New applicant registered: ${newApplicant}`);
        res.status(201).json({
            message: 'Applicant registered successfully!',
            applicant: { id: newApplicant._id, name, username, email },
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

module.exports = {
    registerApplicant,
    signIn,
    logout,
};
