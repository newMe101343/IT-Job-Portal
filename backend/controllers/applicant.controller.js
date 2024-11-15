const Applicant = require('../models/applicant.model');
const bcryptjs = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokens.js')


async function generateAccessAndRefreshToken(_id) {
    try {
        const user = await Applicant.findById(_id)
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



// Controller for applicant registration
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


const sigIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await Applicant.findOne({ email })
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
        console.error('Error sigining applicant:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}


const anotherRouteHandler = (req, res) => {
    res.status(200).json({ message: 'This is another route!' });
};

module.exports = {
    registerApplicant,
    sigIn,
    anotherRouteHandler,
};
