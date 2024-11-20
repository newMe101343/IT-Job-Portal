const express = require("express");
const router = express.Router();
const job = require("../models/job.model");
const HR = require("../models/hr.model");
const Applicant = require("../models/applicant.model");

// Create a job posting
const createJobPost = async (req, res) => {
    try {
        const { title, description, requirements, techStack } = req.body;

        if (!title || !description || !requirements || !techStack) {
            res.status(400).json({ message: "All fields are required" })
        }

        const token = req.cookies?.refreshToken
        const hr = await HR.findOne({ refreshToken: token })

        if (!hr) {
            return res.status(404).json({ message: "No HR signed-in found" })
        }

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

// delete job pasting
const deleteJobPost = async (req, res) => {
    try {
        const jobID = req.params.id
        const currentJob = await job.findOne({ _id: jobID })
        // console.log(req.params.id)
        // console.log(currentJob)

        if (!currentJob) {
            return res.status(404).json({ message: "No Job Found" })
        }

        const token = req.cookies?.refreshToken;
        const hr = await HR.findOne({ refreshToken: token })

        if (!hr) {
            return res.status(404).json({ message: "HR not found" });
        }

        if (hr._id.toString() !== currentJob.hrId.toString()) {
            return res.status(403).json({ message: "Unauthorized request" })
        }

        await job.deleteOne({ _id: jobID })
        return res.status(200).json({ message: 'Job deleted successfully ' });

    } catch (err) {
        return res.status(500).json({ message: 'Error deleting Job', error: err.message });
    }
}

const updateJobPost = async (req, res) => {
    try {
        const jobID = req.params.id;

        const currentJob = await job.findOne({ _id: jobID })
        if (!currentJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        const { title, description, requirements, techStack } = req.body;

        const token = req.cookies?.refreshToken;
        const hr = await HR.findOne({ refreshToken: token })

        if (!hr) {
            return res.status(404).json({ message: "HR not found" });
        }

        if (hr._id.toString() !== currentJob.hrId.toString()) {
            return res.status(403).json({ message: "Unauthorized request" })
        }

        if (title) currentJob.title = title
        if (description) currentJob.description = description
        if (requirements) currentJob.requirements = requirements
        if (techStack) currentJob.techStack = techStack

        await currentJob.save();
        return res.status(200).json({ message: 'Job Updated successfully ' });

    } catch (err) {
        return res.status(500).json({ message: 'Error Updating Job', error: err.message });
    }
}

const getJobPost = async (req, res) => {
    try {
        const jobID = req.params.id;

        const currentJob = await job.findOne({ _id: jobID }).populate('hrId', 'name');

        if (!currentJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        return res.status(200).json({ job: currentJob });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching job", error: err.message });
    }
};

// get all jobs 
const getAllJobs = async (req, res) => {
    try {
        const allJobs = await job.find().populate('hrId', 'name');

        if (!allJobs || allJobs.length === 0) {
            return res.status(404).json({ message: "No jobs found" });
        }

        return res.status(200).json({ jobs: allJobs });
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching jobs', error: err.message });
    }
};

module.exports = {
    createJobPost,
    deleteJobPost,
    updateJobPost,
    getJobPost,
    getAllJobs,
}