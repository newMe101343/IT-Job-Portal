const express = require("express");
const router = express.Router();
const job = require("../models/job.model");
const HR = require("../models/hr.model");
const Applicant = require("../models/applicant.model");

//create job post
const createJobPost = async (req, res) => {
    try {
        let { title, description, requirements, techStack, requiredExperience } = req.body;

        // Check if all required fields are provided
        if (!title || !description || !requirements || !techStack || !requiredExperience) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const token = req.cookies?.refreshToken;
        const hr = await HR.findOne({ refreshToken: token });

        // Check if HR is found
        if (!hr) {
            return res.status(404).json({ message: "No HR signed-in found" });
        }

        // Create a new job posting
        const newJob = await job.create({
            title,
            description,
            requirements,
            techStack,
            requiredExperience,
            hrId: hr._id,
        });

        await newJob.save();

        // Add the new job posting to HR's job postings
        hr.jobPostings.push(newJob._id);
        await hr.save();

        // Send the successful response and stop further code execution
        return res.status(201).json({ message: "Job posted successfully", newJob });
    } catch (error) {
        console.log(error.message);
        
        // Send error response in case of failure
        return res.status(500).json({ error: error.message });
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
        console.log(token);
        
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

        const { title, description, requirements, techStack, requiredExperience } = req.body;

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
        if (requiredExperience) currentJob.requiredExperience = requiredExperience

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

//HR all jobs
const getJobsByHR = async (req, res) => {
    try {
        // Extract refreshToken from cookies
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        // Find HR by refreshToken
        const hr = await HR.findOne({ refreshToken });
        if (!hr) {
            return res.status(404).json({ message: "HR not found" });
        }

        // Fetch all jobs listed by this HR
        const jobs = await job.find({ hrId: hr._id });


        // Return array of job objects
        return res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching jobs", error: err.message });
    }
};



module.exports = {
    createJobPost,
    deleteJobPost,
    updateJobPost,
    getJobPost,
    getAllJobs,
    getJobsByHR
}