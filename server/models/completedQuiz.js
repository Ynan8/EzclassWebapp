const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const completedQuizSchema = new mongoose.Schema({
    studentId: {
        type: ObjectId,
        ref: "User",
    },
    courseId: {
        type: ObjectId,
        ref: "Course",
      },
      quiz: [],
},
    { timestamps: true }
);

module.exports = CompletedQuiz = mongoose.model('CompletedQuiz', completedQuizSchema);