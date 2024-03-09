const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: ObjectId,
    ref: "User",
  },
  assignmentId: {
    type: ObjectId,
    ref: "Assignment",
  },

  fileSubmit: {
    originalName: {
      type: String,
    },
    location: {
      type: String,
    },
    bucket: {
      type: String,
    },
    key: {
      type: String,
    },
  },
  score: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'ยังไม่ตรวจ',
  },
},
  { timestamps: true }
);

module.exports = Submission = mongoose.model('Submission', submissionSchema);
