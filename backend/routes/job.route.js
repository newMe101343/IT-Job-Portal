const router = require('express').Router();
const { createJobPost } = require('../controllers/job.controller');

router.post("/createJobPost", createJobPost)

module.exports = router;
