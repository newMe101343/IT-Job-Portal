const HR = require('../models/HR.model');
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
    console.log(email+password);
    

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




module.exports = {
    registerHR,
    signIn,
};
