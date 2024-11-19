const HR = require('../models/HR.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokens');


async function generateAccessAndRefreshToken(_id) {
    try {
        const user = await HR.findById(_id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        return { accessToken, refreshToken }

    } catch (error) {
        console.error("Error generating tokens:", error);
        res.status(500).json({ message: "Something went wrong while generating tokens" })
    }
}



// Controller for HR registration
const registerHR = async (req, res) => {
    const { name, username, email, password } = req.body;
    console.log("Request received for HR registration");

    if (!name || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await HR.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or Username already taken' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newHR = new HR({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await newHR.save();

        console.log(`New HR registered: ${newHR}`);
        res.status(201).json({
            message: 'HR registered successfully!',
            HR: { id: newHR._id, name, username, email },
        });
    } catch (error) {
        console.error('Error registering HR:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


const signIn = async (req, res) => {
    const { email, password } = req.body;
    console.log(email + password);


    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }


        const user = await HR.findOne({ email })
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: `User with ${email} not registered` })
        }

        const isPasswordMatched = await bcryptjs.compare(password, user.password)
        // console.log(isPasswordMatched);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: `Invalid email or password` })
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        };

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json({ message: "Sign in successfull", user, refreshToken, accessToken })

    } catch (error) {
        console.error('Error sigining HR:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const logout = async (req, res) => {
    console.log("Logout request hit");

    try {
        const token = req.cookies?.refreshToken || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(400).json({ message: 'No refresh token provided' });
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        const user = await HR.findById(decodedToken._id);
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
const fetchHRDetails = async (req, res) => {


    try {
        // Get the token from the cookies
        const token = req.cookies?.refreshToken;

        if (!token) {
            console.log("No token found");
            return res.status(400).json({ message: 'No refresh token provided' });
        }


        // Find the user by the refresh token
        const user = await HR.findOne({ refreshToken: token });

        if (!user) {
            return res.status(404).json({ message: 'User not found or invalid token' });
        }

        const { password, ...userDetails } = user._doc; // Exclude password from the response // Log the user details returned

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
        const user = await HR.findOne({ refreshToken: token });

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
        const user = await HR.findOne({ refreshToken: token });

        user.email = newEmail;
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
        const user = await HR.findOne({ refreshToken: token });

        user.username = newUsername;
        await user.save();

        return res.status(200).json({ message: 'Username updated successfully.' });
    } catch (err) {
        console.error('Error updating Email:', err);
        return res.status(500).json({ message: 'Error updating Username.', error: err.message });
    }
};



module.exports = {
    registerHR,
    signIn,
    logout,
    fetchHRDetails,
    updatePassword,
    updateEmail,
    updateUsername,
};
