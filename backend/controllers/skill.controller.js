const Skill = require('../models/skill.model');

// Add a new question to a specific skill
async function addQuestion(req, res) {
    try {
        const { skillName, question } = req.body;

        if (!skillName || !question) {
            return res.status(400).json({ message: "Skill name and question are required." });
        }

        const skill = await Skill.findOne({ skillName });

        if (!skill) {
            return res.status(404).json({ message: "Skill not found." });
        }

        skill.questions.push(question);  // Assuming `questions` is an array in the skill model
        await skill.save();

        res.status(200).json({ message: "Question added successfully.", skill });
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: "An error occurred while adding the question.", error });
    }
}

// Get questions for a specific skill
async function getQuestions(req, res) {
    try {
        const { skillName } = req.params;  // The skill name comes from the route parameter

        if (!skillName) {
            return res.status(400).json({ message: "Skill name is required." });
        }

        const skill = await Skill.findOne({ skillName });

        if (!skill) {
            return res.status(404).json({ message: "Skill not found." });
        }

        res.status(200).json({ questions: skill.questions }); // Return the list of questions for the skill
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "An error occurred while fetching the questions.", error });
    }
}

module.exports = {
    addQuestion,
    getQuestions
};
