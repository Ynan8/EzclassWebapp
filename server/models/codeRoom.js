const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const codeRoomSchema = new mongoose.Schema({
    codeRoomName: {
        type: String,
        required: true,
    },
    detailCodeRoom: {
        type: String,
        required: true,
    },
   
    consTraints: {
        type: String,
    },
    input1: {
        type: String,
        required: true,
    },
    output1: {
        type: String,
        required: true,
    },
    input2: {
        type: String,
    },
    output2: {
        type: String,
    },
    input3: {
        type: String,
    },
    output3: {
        type: String,
    },
    Published: {
        type: String,
        required: true,
    },
    Difficulty: {
        type: Number,
        required: true,
    },
    courseId: {
        type: ObjectId,
        ref: "Course",
        required: true,
    },
    courseYearId: {
        type: ObjectId,
        ref: "CourseYear",
        required: true,
    },
},
    { timestamps: true }
);

module.exports = CodeRoom = mongoose.model('CodeRoom', codeRoomSchema);