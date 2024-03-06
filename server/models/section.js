const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const sectionSchema = new mongoose.Schema({
    sectionName: { type: String, required: true },
    lesson: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
        }
    ],
    quiz: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz',
        }
    ],
    assignment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment',
        }
    ],
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

module.exports = Section = mongoose.model('Section', sectionSchema);