const mongoose = require('mongoose');

const skill = new mongoose.Schema({
  skillName: { type: String, required: true, unique: true }, 
  questions: [
    {
      questionText: { type: String, required: true },         
      options: { type: [String], required: false },           
      correctAnswer: { type: String, required: true },                
    }
  ]
}, 
{ timestamps: true }); 

module.exports = mongoose.model('Skill', skill);
