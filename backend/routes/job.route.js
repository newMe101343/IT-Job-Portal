const router = require('express').Router();
const { createJobPost, checkJobStatus, deleteJobPost, getJobsAppliedByApplicant , updateJobPost, getJobPost, getAllJobs, getJobsByHR, applyJob, unapplyJob, getAllAppliedApplicants, approveOrRejectApplicant, getEligibleJobs } = require('../controllers/job.controller');

router.post("/createJobPost", createJobPost)
router.post("/deleteJobPost/:id", deleteJobPost)
router.post("/updateJobPost/:id", updateJobPost)

router.get("/getJobPost/:id", getJobPost)
router.get("/getAllJobs/", getAllJobs)
router.get("/getJobsByHR", getJobsByHR)

router.post("/applyJob/:id", applyJob)
router.post("/unapplyJob/:id", unapplyJob)

router.get("/checkJobStatus/:id", checkJobStatus);
router.get("/getJobsAppliedByApplicant", getJobsAppliedByApplicant);
router.get("/getAllAppliedApplicants/:id", getAllAppliedApplicants)
router.get("/getEligibleJobs/", getEligibleJobs)

router.post("/approveOrRejectApplicant/:jobId/applicants/:applicantId/", approveOrRejectApplicant)


module.exports = router;