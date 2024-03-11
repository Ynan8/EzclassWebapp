const CodeRoom = require("../models/codeRoom");
const Course = require("../models/course");

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