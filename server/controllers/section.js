const Course =  require("../models/course");
const Section = require ("../models/section");

exports.addSection = async (req, res) => {
    try {
        const { courseYearId, courseId } = req.params;
        const existingCourse = await Course.findOne({ _id: courseId });
        if (!existingCourse) {
            return res.status(404).send("Course not found");
        }

        const section = await new Section({
            courseYearId: courseYearId,
            courseId: courseId,
            ...req.body,
        }).save();

        res.json(section);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Add section failed");
    }
}

exports.getSection = async (req, res) => {
    try {
        const { courseYearId } = req.query;
        const section = await Section.find({ courseYearId });
        res.json(section);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching section.' });
    }
}

exports.updateSection = async (req, res) => {
    try {
        const { _id, } = req.body;
    
        const updated = await Section.findOneAndUpdate(
            { _id },
            req.body,
            {
                new: true,
            }).exec();
        console.log("update", updated);
        res.json({ ok: true });
    } catch (err) {
        console.log(err)
        return res.status(400).send("Update section failed");
    }
}

exports.removeSection = async (req, res) => {
    try {
        const { sectionId } = req.params;

        const removeSection = await Section.findByIdAndDelete({ _id: sectionId })
            .exec()
        console.log(removeSection)
        res.json({ ok: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error: Failed to remove course.' });
    }
};

