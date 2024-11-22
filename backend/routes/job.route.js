const router = require('express').Router();
const { createJobPost, deleteJobPost, updateJobPost, getJobPost, getAllJobs, getJobsByHR, applyJob, unapplyJob } = require('../controllers/job.controller');

router.post("/createJobPost", createJobPost)
router.post("/deleteJobPost/:id", deleteJobPost)
router.post("/updateJobPost/:id", updateJobPost)

router.get("/getJobPost/:id", getJobPost)
router.get("/getAllJobs/", getAllJobs)
router.get("/getJobsByHR", getJobsByHR)

router.post("/applyJob/:id", applyJob)
router.post("/unapplyJob/:id", unapplyJob)

module.exports = router;