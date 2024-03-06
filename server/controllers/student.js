const CourseRoom = require('../models/courseRoom');
const Course = require('../models/course');
const User = require('../models/user');

exports.StudentCourses = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).exec();
  
      // Assuming you want to find CourseRooms where the user is a student
      const coursesRoom = await CourseRoom.find({ studentId: user._id })
        .sort({ createdAt: 1 })
        .exec();
  
      // Extract courseId from each CourseRoom document
      const courseIds = coursesRoom.map(courseRoom => courseRoom.courseId);
  
      // Use the courseIds to fetch data from the Course model
      const courses = await Course.find({ _id: { $in: courseIds } }).exec();
  
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  exports.getCourseYearId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const courseRoom = await CourseRoom.findOne({
        courseId: id,
        studentId: user._id,
      });
  
      if (!courseRoom) {
        return res.status(404).json({ error: "No course room found for the user" });
      }
  
      const courseYearId = courseRoom.courseYearId.toString()
  
      // Send the courseYearId as a string directly without wrapping it in an object
      res.json(courseYearId);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  exports.studentList = async (req, res) => {
    try {
      const student = await User.find({ role: 'student' })
        .select('-password -role')
        .exec()
      res.json(student)
    } catch (err) {
      console.log(err)
    }
  }