const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const courseYearSchema = new mongoose.Schema({
  year: {
    type: String,
  },
  courseId: {
    type: ObjectId,
    ref: "Course",
    required: true,
  },
  status: {
    type: Boolean,
    default: true
  },
},
  { timestamps: true }
);

module.exports = CourseYear = mongoose.model('CourseYear', courseYearSchema);