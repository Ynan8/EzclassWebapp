const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const submissionCodeSchema = new mongoose.Schema({
  studentId: {
    type: ObjectId,
    ref: "User",
  },
  codeRoomId: {
    type: ObjectId,
    ref: "CodeRoom",
  },
  score: {
    type: Number,
    default: 0,
  },
  
  percentPass: {
    type: Number,
    default: 0,
  },
  code:{ 
    type: String,
  },
  status: {
    type: String,
    default: '',
  },
},
  { timestamps: true }
);

module.exports = SubmissionCode = mongoose.model('SubmissionCode', submissionCodeSchema);
