const User = require("../models/user");
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
  