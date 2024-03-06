const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: true,
  },
  maxAttempts: {
    type: Number,
    required: true,
  },
  passingThreshold: {
    type: Number,
    required: true,
  },
  timeLimitMinutes: {
    type: Number,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      questionType: {
        type: String,
        enum: ['multiple-choice', 'single-choice', 'true-false',],
        required: true,
      },
      options: {
        type: [String], // For 'multiple-choice' and 'single-choice'
      },
      correctOptionIndex: {
        type: [Number], // For 'multiple-choice' and 'single-choice'
      },
      correctAnswerIndex: {
        type: Number, // For 'multiple-choice' and 'single-choice'
      },
      trueFalseOptions: {
        type: String, // For 'true-false'
      },
      score:{
        type: Number,
      }
    },
  ],
  published: {
    type: String,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
