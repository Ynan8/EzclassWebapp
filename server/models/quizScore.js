const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const quizScoreSchema = new mongoose.Schema({
    courseId: {
        type: ObjectId,
        ref: "Course",
    },
    courseRoomId: {
        type: ObjectId,
        ref: "CourseRoom",
    },
    sectionId: {
        type: ObjectId,
        ref: "Section",
    },
    quizId: {
        type: ObjectId,
        ref: "Quiz",
    },
    studentId: {
        type: ObjectId,
        ref: "User",
    },

    score: {
        type: Number,
    },
    attempts: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
);

module.exports = QuizScore = mongoose.model('QuizScore', quizScoreSchema);
