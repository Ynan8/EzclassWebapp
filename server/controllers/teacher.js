const Course = require('../models/course');
const CourseRoom = require('../models/courseRoom');
const QuizScore = require('../models/quizScore');
const Section = require('../models/section');
const Submission = require('../models/submission');

const User = require('../models/user');
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

// exports.ImportStudent = async (req, res) => {
//   try {
//     const { students } = req.body;
//     const { courseRoomId } = req.params;



//     // Extract usernames from student data
//     const usernames = students.map(studentData => studentData['รหัสนักเรียน']);

//     // Query the database to find existing students with the given usernames
//     const existingStudents = await User.find({ username: { $in: usernames } });

//     // Process and save each student to the database
//     const savedStudents = await Promise.all(
//       students.map(async (studentData) => {
//         const { 'รหัสนักเรียน': username, 'ชื่อจริง': firstName, 'นามสกุล': lastName,  password, } = studentData;


//         const hashedPassword = await hashPassword(password);

//         // Find the existing student with the given username
//         const existingStudent = existingStudents.find(student => student.username === username);

//         if (existingStudent) {
//           // Check if studentId already exists in the CourseRoom
//           const courseRoom = await CourseRoom.findById(courseRoomId);
//           if (courseRoom.studentId.includes(existingStudent._id)) {
//             return { message: 'Student already exists in CourseRoom', student: existingStudent };
//           }

//           // Update existing student
//           const updatedCourseRoom = await CourseRoom.findByIdAndUpdate(
//             courseRoomId,
//             {
//               $addToSet: { studentId: existingStudent._id },
//             },
//             { new: true }
//           ).exec();

//           return { message: 'Existing student updated', student: existingStudent, courseRoom: updatedCourseRoom };
//         } else {
//           // Create a new student instance
//           const newStudent = new User({
//             firstName,
//             lastName,
//             username,
//             password: hashedPassword,
//             role: "student",
//           });

//           // Save the new student to the database
//           await newStudent.save();

//           // Check if studentId already exists in the CourseRoom
//           const courseRoom = await CourseRoom.findById(courseRoomId);
//           if (courseRoom.studentId.includes(newStudent._id)) {
//             return { message: 'Student already exists in CourseRoom', student: newStudent };
//           }

//           // Update the CourseRoom model with the new student's _id
//           const updatedCourseRoom = await CourseRoom.findByIdAndUpdate(
//             courseRoomId,
//             {
//               $addToSet: { studentId: newStudent._id },
//             },
//             { new: true }
//           ).exec();

//           return { message: 'New student created', student: newStudent, courseRoom: updatedCourseRoom };
//         }
//       })
//     );

//     console.log('Saved student data:', savedStudents);

//     res.status(200).json({ message: 'Student data received and saved successfully!', students: savedStudents });
//   } catch (error) {
//     console.error('Error importing students:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

exports.ImportStudent = async (req, res) => {
  try {
    const { students } = req.body;

    // Extract usernames from student data
    const usernames = students.map(studentData => studentData['รหัสนักเรียน']);

    // Process and save each student to the database
    const savedStudents = [];
    const existingStudentsUpdated = [];

    const existingStudents = await User.find({ username: { $in: usernames } });

    if (existingStudents.length > 0) {
      return res.status(400).send("มีรหัสนักเรียนแล้ว กรุณาตรวจสอบข้อมูลให้ถูกต้อง");
    }
    students.map(async (studentData) => {
      const { 'รหัสนักเรียน': username, 'ชื่อจริง': firstName, 'นามสกุล': lastName, password, } = studentData;

      // Check if the username already exists
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        // If the user already exists, update their information
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.password = await hashPassword(password);
        await existingUser.save();
        existingStudentsUpdated.push(existingUser);
      } else {
        // If the user doesn't exist, create a new one
        const hashedPassword = await hashPassword(password);

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
        savedStudents.push(newStudent);
      }
    })

    console.log('Saved student data:', savedStudents);
    console.log('Updated existing students:', existingStudentsUpdated);

    let message = 'Student data received and saved successfully!';
    if (existingStudentsUpdated.length > 0) {
      message += ' Existing students were updated.';
    }

    res.status(200).json({ message, students: savedStudents.concat(existingStudentsUpdated) });
  } catch (error) {
    console.error('Error importing students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.ImportStudentCourse = async (req, res) => {
  try {
    const { students } = req.body;
    const { id } = req.params;

    // Extract usernames from student data
    const usernames = students.map(studentData => studentData['รหัสนักเรียน']);

    // Query the database to find existing students with the given usernames
    const existingStudents = await User.find({ username: { $in: usernames } });

    // Process and save each student to the database
    const savedStudents = await Promise.all(
      students.map(async (studentData) => {
        const { 'รหัสนักเรียน': username, 'ชื่อจริง': firstName, 'นามสกุล': lastName } = studentData;

        // Find the existing student with the given username
        const existingStudent = existingStudents.find(student => student.username === username);

        if (existingStudent) {
          // Update existing student
          const updatedCourseRoom = await CourseRoom.findByIdAndUpdate(
            id,
            {
              $addToSet: { studentId: existingStudent._id },
            },
            { new: true }
          ).exec();
          return updatedCourseRoom; // Return the updated CourseRoom document
        }
      })
    );

    res.status(200).json(savedStudents.filter(student => student)); 
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
      .populate('studentId', ' username firstName lastName createdAt ') // Adjust fields as needed
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

exports.removeStudent = async (req, res) => {
  const { idStudent, id } = req.params;

  try {
    const courseRoom = await CourseRoom.updateOne(
      { _id: id },
      { $pull: { studentId: idStudent } }
    );

    if (courseRoom.nModified === 0) {
      return res.status(404).json({ error: "Student not found in the course room" });
    }

    res.json({ message: "Student removed from the course room successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error: Failed to remove student." });
  }
}

exports.UpdateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the password is provided in the request body
    if (req.body.password) {
      // Hash the new password
      const hashedPassword = await hashPassword(req.body.password);
      // Update the password in the request body
      req.body.password = hashedPassword;
    }

    const updated = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }).exec();

    console.log("update", updated);
    res.json(updated); // Send the updated document as the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





exports.getQuizScoreCourse = async (req, res) => {
  try {
    const { courseId } = req.params;  // Destructure to get courseId

    const quizScoreCourse = await QuizScore.find({ courseId: courseId })
      .exec();
    res.json(quizScoreCourse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getQuizScoreRoom = async (req, res) => {
  try {
    const { roomId } = req.params;  // Destructure to get courseId

    const quizScoreRoom = await QuizScore.find({ courseRoomId: roomId })
      .exec();
    res.json(quizScoreRoom);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAssignmentRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const assignmentRoom = await Submission.find({ roomId: id })
      .exec();
    res.json(assignmentRoom);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.averageScores = async (req, res) => {
  const { courseYearId } = req.params;

  try {
    const sections = await Section.find({ courseYearId }).lean();
    const courseRooms = await CourseRoom.find({ courseYearId }).lean();
    let allScores = [];

    for (let section of sections) {
      let roomScores = [];
      for (let room of courseRooms) {
        let scores = await QuizScore.find({
          sectionId: section._id,
          courseRoomId: room._id
        }).lean();
        let averageScore = scores.reduce((acc, { score }) => acc + score, 0) / scores.length || 0;
        roomScores.push(averageScore);
      }
      allScores.push({
        section: section.sectionName,
        scores: roomScores
      });
    }

    res.json(allScores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


exports.averageScoresRoom = async (req, res) => {
  const { courseYearId, courseRoomId } = req.params; // Adjusted to match the router parameters

  try {
    const sections = await Section.find({ courseYearId }).lean();
    const room = await CourseRoom.findById(courseRoomId).lean(); // Matched to the route parameter

    let allScores = [];

    for (let section of sections) {
      let scores = await QuizScore.find({
        sectionId: section._id,
        courseRoomId: room._id, // Now correctly using the variable from parameters
      }).lean();

      let averageScore = scores.reduce((acc, { score }) => acc + score, 0) / scores.length || 0;
      allScores.push({
        section: section.sectionName,
        score: averageScore, // It's not an array of scores, it's a single average score
      });
    }

    res.json(allScores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



exports.addStudent = async (req, res) => {
  //courseRoomId
  // const { id } = req.params;
  try {
    //Check student
    const { firstName, lastName, username, password } = req.body;


    var user = await User.findOne({ username }).exec();
    if (user) {
      return res.status(400).send("มีรหัสนักเรียนแล้ว");
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    user = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      role: "student",
    });

    await user.save();

    console.log("save teacher", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.addStudentCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const { selectedStudent } = req.body;

    // Check if the selected student already exists in the course room
    const existingCourseRoom = await CourseRoom.findOne({ _id: id, studentId: selectedStudent._id }).exec();
    if (existingCourseRoom) {
      return res.status(400).send("มีนักเรียนในรายวิชานี้แล้ว");
    }

    // Add the selected student to the course room
    const updatedCourseRoom = await CourseRoom.findByIdAndUpdate(
      id,
      {
        $addToSet: { studentId: selectedStudent._id },
      },
      { new: true }
    ).exec();

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


exports.getStudentData = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getSectionData = async (req, res) => {
  try {
    const section = await Section.findById(req.params.sectionId);
    if (!section) return res.status(404).send('Section not found');
    res.send(section);
  } catch (e) {
    res.status(500).send(e);
  }
};

