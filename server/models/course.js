const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const courseSchema = new mongoose.Schema({
    courseNo: {
        type: String,
        require: true,
    },
    courseName: {
        type: String,
        require: true,
    },
    detail: {
        type: String,
        require: true,
    },
    level: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {},
    teacher: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

module.exports = Course = mongoose.model('Course', courseSchema);
