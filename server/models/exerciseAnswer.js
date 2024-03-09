const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const exerciseAnswerSchema = new mongoose.Schema({
  studentId: {
    type: ObjectId,
    ref: "User",
  },
  courseId: {
    type: ObjectId,
    ref: "Course",
  },
  exercise: [],
},
{ timestamps: true }
);

module.exports = ExerciseAnswer = mongoose.model('ExerciseAnswer', exerciseAnswerSchema);
