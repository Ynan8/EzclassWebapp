const CourseRoom = require("../models/courseRoom");
const CourseYear = require("../models/courseYear");

exports.addCourseRoom = async (req, res) => {
  try {
    const { roomName, courseYearId, } = req.body;

    const courseYear = await CourseYear.findById(courseYearId);

    if (!courseYear) {
      console.log('CourseYear not found');
      return;
    }

    const courseId = courseYear.courseId;

    // Check if the classroom already exists
    const existingClassroom = await CourseRoom.findOne({ roomName, courseYearId, }).exec();
    if (existingClassroom) {
      return res.status(400).json({ error: 'Classroom already exists' });
    }

    // Create and save the classroom
    const courseRoom = await new CourseRoom({
      courseYearId: courseYearId,
      courseId: courseId,
      ...req.body,
    }).save();

    res.json(courseRoom);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error!");
  }
};

exports.getCourseRoom = async (req, res) => {
  try {
    const courseYearId = req.params.id;


    if (!courseYearId) {
      return res.status(400).json({ error: "Invalid courseYearId" });
    }

    // Use populate to retrieve Course and CourseYear data
    const courseRooms = await CourseRoom.find({ courseYearId })
      .populate('courseId', 'courseName') // Populate Course data, include only 'courseName' field
      .populate('courseYearId', 'year'); // Populate CourseYear data, include only 'yearName' field

    res.json(courseRooms);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCourseRoom = async (req, res) => {
  try {
    const { _id, courseYearId, roomName } = req.body;

    const existingCourseRoom = await CourseRoom.findOne({ courseYearId, roomName, }).exec();
    if (existingCourseRoom) {
      return res.status(400).json({ error: 'Course year already exists' });
    }

    const updated = await CourseRoom.findOneAndUpdate({ _id }, req.body, {
      new: true,
    }).exec();
    console.log("update", updated)
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCourseRoom = async (req, res) => {
  const roomId = req.params.id;

  try {
    // Delete the course year by ID
    const deletedCourseRoom = await CourseRoom.findByIdAndDelete(roomId);

    // Check if the course year exists
    if (!deletedCourseRoom) {
      return res.status(404).json({ error: 'Course year not found.' });
    }

    // Return success response
    res.status(200).json({ message: 'Course year deleted successfully.' });
  } catch (error) {
    console.error('Error deleting course year:', error);
    res.status(500).json({ error: 'Failed to delete course.' });
  }
};