const router = require('express').Router();
const { createJobPost, deleteJobPost, updateJobPost, getJobPost, getAllJobs } = require('../controllers/job.controller');

router.post("/createJobPost", createJobPost)
router.post("/deleteJobPost/:id", deleteJobPost)
router.post("/updateJobPost/:id", updateJobPost)

router.get("/getJobPost/:id", getJobPost)
router.get("/getAllJobs/", getAllJobs)

module.exports = router;