const CourseYear = require("../models/courseYear");

const Course = require("../models/course");

exports.addCourseYear = async (req, res) => {
  try {
    const { courseId, year, } = req.body;

    // Check if the courseYear already exists
    const existingCourseYear = await CourseYear.findOne({ courseId, year, }).exec();
    if (existingCourseYear) {
      return res.status(400).json({ error: 'Course year already exists' });
    }

    // Create and save the classroom
    const courseYear = await new CourseYear({
      courseId: courseId,
      ...req.body,
    }).save();

    res.json(courseYear);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error!");
  }
};

exports.getCourseYear = async (req, res) => {
  try {
    const courseId = req.params.id;

    if (!courseId) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const courseYear = await CourseYear.find({ courseId: courseId })

    res.json(courseYear);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCourseYear = async (req, res) => {
  try {
    const { _id, courseId, year } = req.body;

    // Check if the courseYear already exists
    const existingCourseYear = await CourseYear.findOne({ courseId, year, }).exec();
    if (existingCourseYear) {
      return res.status(400).json({ error: 'Course year already exists' });
    }

    const updated = await CourseYear.findOneAndUpdate({ _id }, req.body, {
      new: true,
    }).exec();
    console.log("update", updated)
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCourseYear = async (req, res) => {
  const courseYearId = req.params.id;

  try {
    // Delete the course year by ID
    const deletedCourseYear = await CourseYear.findByIdAndDelete(courseYearId);

    // Check if the course year exists
    if (!deletedCourseYear) {
      return res.status(404).json({ error: 'Course year not found.' });
    }

    // Return success response
    res.status(200).json({ message: 'Course year deleted successfully.' });
  } catch (error) {
    console.error('Error deleting course year:', error);
    res.status(500).json({ error: 'Failed to delete course.' });
  }
};

exports.getSingleCourseYear = async (req, res) => {
  try {
    const courseYearId = req.params.id;

    if (!courseYearId) {
      return res.status(400).json({ error: "Invalid course year ID" });
    }

    const courseYear = await CourseYear.find({ _id: courseYearId })

    res.json(courseYear);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.archivedCourseYear = async (req, res) => {
  const courseYearId = req.params.id;
  try {
    // Update the course year status to false by ID
    const updatedCourseYear = await CourseYear.findByIdAndUpdate(courseYearId, { status: false }, { new: true });

    // Check if the course year exists
    if (!updatedCourseYear) {
      return res.status(404).json({ error: 'Course Year not found.' });
    }
    // Return the updated course data
    res.status(200).json(updatedCourseYear);
  } catch (error) {
    console.error('Error marking course year as completed:', error);
    res.status(500).json({ error: 'Failed to mark course year as completed.' });
  }
};

exports.cancelArchivedCourseYear = async (req, res) => {
  const courseYearId = req.params.id;

  try {
    // Update the course status to true by ID
    const updatedCourse = await CourseYear.findByIdAndUpdate(courseYearId, { status: true }, { new: true });

    // Check if the course exists
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Return the updated course data
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error('Error canceling course completion:', error);
    res.status(500).json({ error: 'Failed to cancel course completion.' });
  }
};
