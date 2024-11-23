const express = require("express");
const router = express.Router();
const Job = require("../models/job.model");
const HR = require("../models/hr.model");
const Applicant = require("../models/applicant.model");

const createJobPost = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const hr = await HR.findOne({ refreshToken });

        if (!hr) {
            return res.status(404).json({ message: "HR not found" });
        }

        const { title, description, requirements, techStack, requiredExperience } = req.body;

        const newJob = await Job.create({
            title,
            description,
            requirements,
            techStack,
            requiredExperience,
            hrId: hr._id, // Link the job to HR
        });

        hr.jobPostings.push(newJob._id);
        await hr.save();

        return res.status(201).json({ message: "Job posted successfully", newJob });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error creating job post", error: error.message });
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

        const { title, description, requirements, techStack, requiredExperience, degree } = req.body;

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
        if (degree) currentJob.degree = degree

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

        res.status(200).json({ message: "Job application withdrawn successfully" });
    } catch (error) {
        console.error("Error withdrawing job application:", error);
        res.status(500).json({ message: "An error occurred while withdrawing the job application" });
    }
};

const getAllAppliedApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const token = req.cookies?.refreshToken
        const hr = await HR.findOne({ refreshToken: token })
        if (!hr) {
            return res.status(404).json({ message: "Not authenticated" })
        }

        if (hr._id.toString() !== hr._id.toString()) {
            return res.status(401).json({ message: "Unauthorized request" })
        }

        const currentJob = await Job.findById(jobId).populate("applicants", "name email techStack experience profilePicture masters bachelors GitHub LinkedIn Twitter StackOverflow LeetCode");
        // console.log(currentJob)

        res.status(200).json({ applicants: currentJob.applicants });
    } catch (error) {
        // console.error("Error fetching applicants:", error);
        res.status(500).json({ message: "An error occurred while fetching applicants" });
    }
}


const approveOrRejectApplicant = async (req, res) => {
    try {
        const { jobId, applicantId } = req.params;
        const { action } = req.body; // Action: "approve" or "reject"

        if (!jobId || !applicantId || !action) {
            return res.status(400).json({ message: "Job ID, Applicant ID, and action are required" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const applicant = await Applicant.findById(applicantId);
        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        if (!job.applicants.includes(applicantId)) {
            return res.status(400).json({ message: "Applicant has not applied for this job" });
        }

        const token = req.cookies?.refreshToken
        const hr = await HR.findOne({ refreshToken: token })
        if (!hr) {
            return res.status(404).json({ message: "Not authenticated" })
        }

        if (hr._id.toString() !== hr._id.toString()) {
            return res.status(401).json({ message: "Unauthorized request" })
        }

        if (action === "approve") {
            // Approve: Add the applicant to approvedApplicants
            job.approvedApplicants = job.approvedApplicants || [];
            job.approvedApplicants.push(applicantId);

            // Remove the applicant from the job's applicants list
            job.applicants = job.applicants.filter(id => id.toString() !== applicantId);
            await job.save();

            return res.status(200).json({ message: "Applicant approved successfully" });
        } else if (action === "reject") {
            // Reject: Remove the applicant from the job's applicants list
            job.applicants = job.applicants.filter(id => id.toString() !== applicantId);
            await job.save();

            return res.status(200).json({ message: "Applicant rejected successfully" });
        } else {
            return res.status(400).json({ message: "Invalid action. Use 'approve' or 'reject'" });
        }
    } catch (error) {
        console.error("Error applying or rejecting applicant:", error);
        res.status(500).json({ message: "An error occurred while processing the request" });
    }
};

// getAllEligibleJobs
const getEligibleJobs = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;
        const applicant = await Applicant.findOne({ refreshToken: token });

        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        // Fetch jobs that match the applicant's qualifications
        const eligibleJobs = await Job.find({
            requiredExperience: { $lte: applicant.experience },
            techStack: { $all: applicant.techStack },
            degree: { $regex: new RegExp(applicant.degree, "i") }, // Case-insensitive match
        });

        res.status(200).json({ eligibleJobs });
    } catch (error) {
        // console.error("Error fetching eligible jobs:", error);
        res.status(500).json({ message: "Server error" });
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
    getAllAppliedApplicants,
    approveOrRejectApplicant,
    getEligibleJobs,
}