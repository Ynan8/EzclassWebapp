const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const courseLogsSchema = new mongoose.Schema({
    courseId: {
        type: ObjectId,
        ref: "Course",
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    note: {
        type: String
    }
}, { timestamps: true });

module.exports = CourseLogs = mongoose.model('CourseLogs', courseLogsSchema);
