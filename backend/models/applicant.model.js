const mongoose = require("mongoose");
const { generateAccessToken, generateRefreshToken } = require("../utils/tokens.js");

const applicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
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
        type: String,
        default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    bachelors: {
        type: String,
        default: null
    },
     masters: {
        type: String,
        default: null
    },
    
    techStack: {
        type: [String],
        default: []
    },
    experience: {
        type: Number,
        default: null,
        trim: true,
    },
    GitHub: {
        type: String,
        default: null
    },
    LinkedIn: {
        type: String,
        default: null
    },
    Twitter: {
        type: String,
        default: null
    },
    StackOverflow: {
        type: String,
        default: null
    },
    LeetCode: {
        type: String,
        default: null
    },
    appliedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ],
    refreshToken: {
        type: String,
        default: null
    },
    otp: {
        type: Number,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
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

applicantSchema.methods.generateAccessToken = function () {
    return generateAccessToken(this);
};

applicantSchema.methods.generateRefreshToken = function () {
    return generateRefreshToken(this);
};

const Applicant = mongoose.model.Applicant || mongoose.model("Applicant", applicantSchema);
module.exports = Applicant