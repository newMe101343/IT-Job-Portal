const express = require("express");
const router = express.Router();
const Job = require("../models/job.model");
const HR = require("../models/hr.model");
const Applicant = require("../models/applicant.model");

//create Job post
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

        // Create a new Job posting
        const newJob = await Job.create({
            title,
            description,
            requirements,
            techStack,
            requiredExperience,
            hrId: hr._id,
        });

        await newJob.save();

        // Add the new Job posting to HR's Job postings
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


// delete Job pasting
const deleteJobPost = async (req, res) => {
    try {
        const jobID = req.params.id
        const currentJob = await Job.findOne({ _id: jobID })
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

        await Job.deleteOne({ _id: jobID })
        return res.status(200).json({ message: 'Job deleted successfully ' });

    } catch (err) {
        return res.status(500).json({ message: 'Error deleting Job', error: err.message });
    }
}

const updateJobPost = async (req, res) => {
    try {
        const jobID = req.params.id;

        const currentJob = await Job.findOne({ _id: jobID })
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

        const currentJob = await Job.findOne({ _id: jobID }).populate('hrId', 'name');

        if (!currentJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        return res.status(200).json({ Job: currentJob });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching Job", error: err.message });
    }
};

// get all jobs 
const getAllJobs = async (req, res) => {
    try {
        const allJobs = await Job.find().populate('hrId', 'name');

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
        const jobs = await Job.find({ hrId: hr._id });


        // Return array of Job objects
        return res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching jobs", error: err.message });
    }
};

// Apply Job
const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(404).json({ message: "Job ID is required" });
        }

        const token = req.cookies?.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const applicant = await Applicant.findOne({ refreshToken: token });
        if (!applicant) {
            return res.status(404).json({ message: "No applicant found" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the applicant has already applied for the job
        if (applicant.appliedJobs.includes(jobId)) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        job.applicants.push(applicant._id);
        await job.save();

        applicant.appliedJobs.push(jobId);
        await applicant.save();

        res.status(200).json({ message: "Job application successful" });
    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ message: "An error occurred while applying for the job" });
    }
};

// Unapply Job
const unapplyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(404).json({ message: "Job ID is required" });
        }

        const token = req.cookies?.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const applicant = await Applicant.findOne({ refreshToken: token });
        if (!applicant) {
            return res.status(404).json({ message: "No applicant found" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the applicant has applied for the job
        if (!applicant.appliedJobs.includes(jobId)) {
            return res.status(400).json({ message: "You have not applied for this job" });
        }

        // Remove the applicant's ID from the job's applicants array
        job.applicants = job.applicants.filter(applicantId => applicantId.toString() !== applicant._id.toString());
        // console.log(job.applicants)
        await job.save();

        // Remove the job ID from the applicant's appliedJobs array
        applicant.appliedJobs = applicant.appliedJobs.filter(appliedJobId => appliedJobId.toString() !== jobId);
        await applicant.save();

        // Respond with success
        res.status(200).json({ message: "Job application withdrawn successfully" });
    } catch (error) {
        console.error("Error withdrawing job application:", error);
        res.status(500).json({ message: "An error occurred while withdrawing the job application" });
    }
};



module.exports = {
    createJobPost,
    deleteJobPost,
    updateJobPost,
    getJobPost,
    getAllJobs,
    getJobsByHR,
    applyJob,
    unapplyJob,
}