const express = require('express');
const router = express.Router();
const { addQuestion, getQuestions } = require('../controllers/skill.controller');


router.post('/addQuestion', addQuestion);
router.get('/:skillName/questions', getQuestions);

module.exports = router;
