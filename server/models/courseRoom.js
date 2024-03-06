const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const courseRoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
    },
    courseYearId: {
        type: ObjectId,
        ref: "CourseYear",
        required: true,
    },
    courseId: {
        type: ObjectId,
        ref: "Course",
        required: true,
    },
    studentId: [
        { type: ObjectId, ref: "User" }
    ],
},
    { timestamps: true }
);

module.exports = CourseRoom = mongoose.model('CourseRoom', courseRoomSchema);