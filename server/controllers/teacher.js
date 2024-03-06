const Course = require('../models/course');
const CourseRoom = require('../models/courseRoom');
const { hashPassword, comparePassword } = require('../utils/auth')


exports.TeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    res.json(courses);
  } catch (err) {
    console.log(err);
  }
}

exports.ImportStudent = async (req, res) => {
  try {
    const { students } = req.body;
    const { courseRoomId } = req.params;

    // Extract usernames from student data
    const usernames = students.map(studentData => studentData['รหัสนักเรียน']);

    // Query the database to find existing students with the given usernames
    const existingStudents = await User.find({ username: { $in: usernames } });

    // Process and save each student to the database
    const savedStudents = await Promise.all(
      students.map(async (studentData) => {
        const { 'รหัสนักเรียน': username, 'ชื่อจริง': firstName, 'นามสกุล': lastName, date } = studentData;


        const hashedPassword = await hashPassword(date);

        // Find the existing student with the given username
        const existingStudent = existingStudents.find(student => student.username === username);

        if (existingStudent) {
          // Check if studentId already exists in the CourseRoom
          const courseRoom = await CourseRoom.findById(courseRoomId);
          if (courseRoom.studentId.includes(existingStudent._id)) {
            return { message: 'Student already exists in CourseRoom', student: existingStudent };
          }

          // Update existing student
          const updatedCourseRoom = await CourseRoom.findByIdAndUpdate(
            courseRoomId,
            {
              $addToSet: { studentId: existingStudent._id },
            },
            { new: true }
          ).exec();

          return { message: 'Existing student updated', student: existingStudent, courseRoom: updatedCourseRoom };
        } else {
          // Create a new student instance
          const newStudent = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            role: "student",
          });

          // Save the new student to the database
          await newStudent.save();

          // Check if studentId already exists in the CourseRoom
          const courseRoom = await CourseRoom.findById(courseRoomId);
          if (courseRoom.studentId.includes(newStudent._id)) {
            return { message: 'Student already exists in CourseRoom', student: newStudent };
          }

          // Update the CourseRoom model with the new student's _id
          const updatedCourseRoom = await CourseRoom.findByIdAndUpdate(
            courseRoomId,
            {
              $addToSet: { studentId: newStudent._id },
            },
            { new: true }
          ).exec();

          return { message: 'New student created', student: newStudent, courseRoom: updatedCourseRoom };
        }
      })
    );

    console.log('Saved student data:', savedStudents);

    res.status(200).json({ message: 'Student data received and saved successfully!', students: savedStudents });
  } catch (error) {
    console.error('Error importing students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getStdRoom = async (req, res) => {
  try {
    const codeRoomId = req.params.id;

    if (!codeRoomId) {
      return res.status(400).json({ error: "Invalid course room ID" });
    }

    // Use correct query format: { _id: codeRoomId }
    const courseRoom = await CourseRoom.findOne({ _id: codeRoomId })
      .populate('studentId', ' username firstName lastName ') // Adjust fields as needed
      .exec();

    if (!courseRoom) {
      return res.status(404).json({ error: "Course room not found" });
    }

    // Access student data with complete user details
    const studentsEnrolled = courseRoom.studentId;

    res.json(studentsEnrolled);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.teacherList = async (req, res) => {
  try {
    const teacher = await User.find({ role: 'teacher' })
      .select('-password -role')
      .exec()
    res.json(teacher)
  } catch (err) {
    console.log(err)
  }
}
