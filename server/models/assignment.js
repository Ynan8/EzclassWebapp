const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    assignmentName: {
        type: String,
        required: true,
    },
    assignmentDetail: {
        type: String,
        required: true,
    },
    assignmentFile: {
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
    assignmentDue: {
        type: Date,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
  
    scoreLimit: {
        type: Number,
    },
    courseRoom:[],
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
