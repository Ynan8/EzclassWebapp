const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
    {
      type: { type: String },
      article: { type: String },
      video: { type: String },
      code: { type: String },
      exercise: {
        questionText: { type: String, },
        answers: [
          {
            answerText: { type: String,  },
            isCorrect: { type: Boolean,},
          }
        ]
      },
    },
  );
  
const lessonSchema = new mongoose.Schema(
  {
    lessonName: { type: String },
    contents: [contentSchema],
    published: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Lesson = mongoose.model('Lesson', lessonSchema);
