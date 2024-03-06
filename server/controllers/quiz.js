const Quiz = require("../models/quiz");
const Section = require("../models/section");

exports.addQuiz = async (req, res) => {
    try {
        const { sectionId, quiz } = req.body;

        // Create a new Quiz instance with the provided data
        const newQuiz = new Quiz({
            quizName: quiz.quizName,
            maxAttempts: quiz.maxAttempts,
            passingThreshold: quiz.passingThreshold,
            timeLimitMinutes: quiz.timeLimitMinutes,
            questions: quiz.questions,
            published: quiz.published
        });

        // Save the new quiz to the database
        const savedQuiz = await newQuiz.save();

        // Find the section by sectionId
        const foundSection = await Section.findById(sectionId);

        if (!foundSection) {
            return res.status(404).json({ error: 'Section not found' });
        }

        // Add the lesson ID to the lessons array of the found section
        foundSection.quiz.push(savedQuiz._id);

        // Save the updated section
        const updatedSection = await foundSection.save();

        console.log('quiz added successfully:', savedQuiz);

        return res.status(200).json({
            message: 'Quiz added successfully',
            quiz: savedQuiz,
            section: updatedSection,
        });

    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: 'Add quiz failed' });
    }
};

exports.getQuiz = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        console.error('Error fetching lesson:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.readQuiz = async (req, res) => {
    try {
        const quizId = req.params.id;
        const quiz = await Quiz.findOne({ _id: quizId })
            .exec();
        res.json(quiz);

        console.log(quiz)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { quiz } = req.body;

        // Assuming you have a Quiz model, you can update it like this
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            {
                quizName: quiz.quizName,
                maxAttempts: quiz.maxAttempts,
                passingThreshold: quiz.passingThreshold,
                timeLimitMinutes: quiz.timeLimitMinutes,
                questions: quiz.questions,
                published: quiz.published,
            },
            { new: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        res.json({ success: true, updatedQuiz });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error: Failed to update quiz.' });
    }
};

exports.removeQuiz = async (req, res) => {
    try {
        const {  quizId } = req.params;

        // Find the lesson to be deleted
        const removeQuiz = await Lesson.findByIdAndDelete(quizId).exec();

        // Update the corresponding sections to remove the lesson ID
        const updatedSections = await Section.updateMany(
            { quiz: quizId },
            { $pull: { quiz: quizId } }
        ).exec();
        res.json({ ok: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error: Failed to remove quiz.' });
    }
};