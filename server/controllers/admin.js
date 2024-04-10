const User = require("../models/user");
const CourseRoom = require("../models/courseRoom");
const Completed = require("../models/completed");
const CompletedQuiz = require("../models/completedQuiz");
const CourseYear = require("../models/courseYear");
const { hashPassword } = require("../utils/auth");

exports.addTeacher = async (req, res) => {
    try {
      //Check teacher
      const {firstName, lastName, username, password } = req.body
  
      var teacher = await User.findOne({ username }).exec();
      if (teacher) {
        return res.status(400).send('มีบัญชีผู้ใช้แล้ว');
      }
 
      // hash password
      const hashedPassword = await hashPassword(password);
  
      teacher = new User({
        firstName,
        lastName,
        username,
        password: hashedPassword,
        role:"teacher"
      })
      await teacher.save();
      console.log("save teacher", teacher)
      return res.json({ ok: true });
    } catch (err) {
      console.log(err)
      res.status(500).send('Server Error!')
    }
  }
  
  exports.TeacherCoursesAll = async (req, res) => {
    const { teacherId } = req.params
    try {
      const courses = await Course.find({ teacher: teacherId })
        .sort({ createdAt: -1 })
        .exec();
      res.json(courses);
    } catch (err) {
      console.log(err);
    }
  }

  exports.getTeacher = async (req, res) => {
    const { teacherId } = req.params;
  
    try {
      const teacher = await User.findById(teacherId);
  
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      // Only send necessary information, modify as needed
      const teacherData = {
        _id: teacher._id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        image: teacher.image,
        // Add other fields as needed
      };
  
      res.json(teacherData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  exports.UpdateTeacher = async (req, res) => {
    try {
      const { _id } = req.body;
      const updated = await User.findOneAndUpdate({ _id }, req.body, {
        new: true,
      }).exec();
      console.log("update", updated)
      res.json({ ok: true });
    } catch (err) {
      console.log(err);
    }
  };
  
  exports.removeTeacher = async (req, res) => {
    const teacherId = req.params.id;
  
    try {
      // Delete the course year by ID
      const deletedTeacher = await User.findByIdAndDelete(teacherId);
  
      // Check if the course year exists
      if (!deletedTeacher) {
        return res.status(404).json({ error: 'Course year not found.' });
      }
  
      // Return success response
      res.status(200).json({ message: 'Course year deleted successfully.' });
    } catch (error) {
      console.error('Error deleting course year:', error);
      res.status(500).json({ error: 'Failed to delete course.' });
    }
  };
  
  exports.getCourseYearId = async (req, res) => {
    const { id } = req.params;
    try {
      const courseRoom = await CourseRoom.findOne({
        courseId: id,
      });
  
      if (!courseRoom) {
        return res
          .status(404)
          .json({ error: "No course room found for the user" });
      }
  
      const courseYearId = courseRoom.courseYearId.toString();
  
      // Send the courseYearId as a string directly without wrapping it in an object
      res.json(courseYearId);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  exports.getTotalCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;

        const totalCompletedLessons = await Completed.find({ courseId }).countDocuments();
        const totalCompletedQuizzes = await CompletedQuiz.find({ courseId }).countDocuments();

        res.json({ totalCompletedLessons, totalCompletedQuizzes });
    } catch (error) {
        console.error('Error fetching total completed:', error);
        res.status(500).json({ error: 'Failed to fetch total completed' });
    }
};


exports.getCourseYearIdByCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const courseYearIdByCourse = await CourseYear.find({
      courseId,
    });

    if (!courseYearIdByCourse) {
      return res
        .status(404)
        .json({ error: "No course room found for the user" });
    }

    // Send the courseYearId as a string directly without wrapping it in an object
    res.json(courseYearIdByCourse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getRoomProgress = async (req, res) => {
  const { courseYearId } = req.params;

  try {
      // Find all rooms for the given course year ID
      const rooms = await CourseRoom.find({ courseYearId });

      // Calculate progress for each room
      const roomProgress = await Promise.all(rooms.map(async (room) => {
          const studentCount = room.studentId.length;

          // Fetch completed quizzes and lessons for each student in the room
          const completedQuizPromises = room.studentId.map(studentId =>
              CompletedQuiz.findOne({ studentId, courseId: room.courseId })
          );
          const completedQuizResults = await Promise.all(completedQuizPromises);

          const completedLessonPromises = room.studentId.map(studentId =>
              Completed.findOne({ studentId, courseId: room.courseId })
          );
          const completedLessonResults = await Promise.all(completedLessonPromises);

          // Calculate completion percentage for each student
          const completionPercentages = completedQuizResults.map((quiz, index) => {
              const lesson = completedLessonResults[index];
              const totalQuizzes = quiz ? quiz.quiz.length : 0;
              const totalLessons = lesson ? lesson.lesson.length : 0;
              const totalCompleted = totalQuizzes + totalLessons;
              return (totalCompleted / (totalQuizzes + totalLessons)) * 100;
          });

          // Calculate average completion percentage for the room
          const averageCompletionPercentage = completionPercentages.reduce((acc, curr) => acc + curr, 0) / studentCount;

          return {
              roomId: room._id,
              completionPercentage: isNaN(averageCompletionPercentage) ? 0 : averageCompletionPercentage,
          };
      }));

      res.json(roomProgress);
  } catch (error) {
      console.error("Error loading room progress:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};
