const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const completedSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Completed', completedSchema);
