const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true,
        trim: true
    },
    techStack: {
        type: [String],
        required: true
    },
    hrId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HR",
        required: true
    },
    applicants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Applicant"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Job", jobSchema);
