const Lesson = require("../models/lesson");
const Section = require("../models/section");

exports.addContentLesson = async (req, res) => {
    try {
        const { sectionId, lessons } = req.body;

        // Handle exercise type separately
        const formattedContents = lessons.contents.map((content) => {
            if (content.type === 'exercise') {
                const exercise = {
                    questionText: content.exercise.questionText || '',
                    answers: content.exercise.answers.map(answer => ({
                        answerText: answer.answerText || '',
                        isCorrect: answer.isCorrect || false
                    }))
                };

                return {
                    type: 'exercise',
                    exercise,
                };
            }
            // For other types, return the original content
            return content;
        });

        const newLesson = new Lesson({
            lessonName: lessons.lessonName,
            contents: formattedContents,
            published: lessons.published,
        });

        // Save the lesson to the database
        const savedLesson = await newLesson.save();

        // Find the section by sectionId
        const foundSection = await Section.findById(sectionId);

        if (!foundSection) {
            return res.status(404).json({ error: 'Section not found' });
        }

        // Add the lesson ID to the lessons array of the found section
        foundSection.lesson.push(savedLesson._id);

        // Save the updated section
        const updatedSection = await foundSection.save();

        console.log('Lesson added successfully:', savedLesson);

        return res.status(200).json({
            message: 'Lesson added successfully',
            lesson: savedLesson,
            section: updatedSection,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: 'Add lesson failed' });
    }
};

exports.getLesson = async (req, res) => {
    try {
        const lessonId = req.params.lessonId;
        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        res.status(200).json(lesson);
    } catch (error) {
        console.error('Error fetching lesson:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.removeLesson = async (req, res) => {
    try {
        const {  lessonId } = req.params;
     
        // Find the lesson to be deleted
        const removeLesson = await Lesson.findByIdAndDelete(lessonId).exec();


        // Update the corresponding sections to remove the lesson ID
        const updatedSections = await Section.updateMany(
            { lesson: lessonId },
            { $pull: { lesson: lessonId } }
        ).exec();
        res.json({ ok: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error: Failed to remove lesson.' });
    }
};

exports.readLesson = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const lesson = await Lesson.findOne({ _id: lessonId })
            .exec();
        res.json(lesson);

        console.log(lesson)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateContentLesson = async (req, res) => {
    try {

        const { id } = req.params;
        const { lessonName, contents, published } = req.body;

        // Assuming you have a lesson model, you can update it like this
        const updatedLesson = await Lesson.findByIdAndUpdate(
            id,
            { lessonName, contents, published },
            { new: true }
        );

        if (!updatedLesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        res.json({ success: true, updatedLesson });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error: Failed to update lesson.' });
    }
}

