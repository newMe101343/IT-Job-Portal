const express = require("express");
const router = express.Router();
const job = require("../models/job.model");
const HR = require("../models/hr.model");

// Create a job posting
const createJobPost = async (req, res) => {
    try {
        const { title, description, requirements, techStack } = req.body;

        if (!title || !description || !requirements || !techStack) {
            res.status(400).json({ message: "All fields are required" })
        }

        const token = req.cookies?.refreshToken
        const hr = await HR.findOne({ refreshToken: token })

        // Create a new job
        const newJob = await job.create({
            title,
            description,
            requirements,
            techStack,
            hrId: hr._id,
        });

        await newJob.save();

        hr.jobPostings.push(newJob._id);
        await hr.save();

        res.status(201).json({ message: "Job posted successfully", newJob });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createJobPost,
}