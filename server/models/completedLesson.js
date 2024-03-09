const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const completedLessonSchema = new mongoose.Schema({
  studentId: {
    type: ObjectId,
    ref: "User",
  },
  courseId: {
    type: ObjectId,
    ref: "Course",
  },
  lesson: [],
},
  { timestamps: true }
);

module.exports = CompletedLesson = mongoose.model('CompletedLesson', completedLessonSchema);