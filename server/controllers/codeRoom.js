const CodeRoom = require("../models/codeRoom");
const Course = require("../models/course");
const SubmissionCode = require("../models/submissionCode");

exports.create = async (req, res) => {
    try {
        const { courseId, courseYearId } = req.params;

        const existingCourse = await Course.findOne({ _id: courseId });
        if (!existingCourse) {
            return res.status(404).send("Course not found");
        }
        const newCodeRoom = await new CodeRoom({
            courseId: courseId,
            courseYearId: courseYearId,
            ...req.body
        }).save();
        res.json(newCodeRoom);
    } catch (err) {
        console.log(err)
        return res.status(400).send('ไม่สามารถสร้างรายวิชาได้ ลองอีกครั้ง!=');
    }
}

exports.getCodeRoom = async (req, res) => {
    try {
        const { courseYearId } = req.query;
        const codeRoom = await CodeRoom.find({ courseYearId });
        res.json(codeRoom);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching section.' });
    }
}

exports.getProblem = async (req, res) => {
    try {
        const { codeRoomId } = req.params;
        const codeRoom = await CodeRoom.findById(codeRoomId);
        res.json(codeRoom);
        console.log(codeRoom)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching problem.' });
    }
};

exports.submitCode = async (req, res) => {
    try {
        const { studentId, codeRoomId, score, percentPass, code, status } = req.body;

        // Check if a submission already exists for this student and code room
        let submission = await SubmissionCode.findOne({
            studentId:req.user._id,
            codeRoomId 
        });

        if (submission) {
            // Update existing submission
            submission.score = score;
            submission.percentPass = percentPass;
            submission.code = code;
            submission.status = status;
        } else {
            // Create a new submission
            submission = new SubmissionCode({
                studentId: req.user._id,
                codeRoomId,
                score,
                percentPass,
                code,
                status
            });
        }

        // Save the submission
        await submission.save();

        // Respond with the updated or created submission
        res.json(submission);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error submitting code.' });
    }
};


exports.joinRoom = async (req, res) => {
    const { roomId } = req.body;
    try {
        // Check if the room exists and if the user can join it
        const room = await findRoomById(roomId);
        if (room) {
            // User can join the room
            res.json({ success: true });
        } else {
            // Room not found or user cannot join
            res.json({ success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching problem.' });
    }
};


