const mongoose = require("mongoose");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokens.js");

const hrSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    company_category: {
        type: String,
        required: true,
        trim: true
    },
    companyWebsite: {
        type: String,
        match: [
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            "Please enter a valid URL for the company website"
        ]
    },
    jobPostings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ],
    refreshToken: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateAccessToken = function () {
    return generateAccessToken(this);
};

userSchema.methods.generateRefreshToken = function () {
    return generateRefreshToken(this);
};

module.exports = mongoose.model("HR", hrSchema);