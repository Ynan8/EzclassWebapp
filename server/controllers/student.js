const CourseRoom = require('../models/courseRoom');
const Course = require('../models/course');
const User = require('../models/user');
const CompletedLesson = require('../models/completedLesson');
const CompletedQuiz = require('../models/completedQuiz');
const QuizScore = require('../models/quizScore');
const ExerciseAnswer = require('../models/exerciseAnswer');

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

exports.getCourseRoomId = async (req, res) => {
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
    res.json(courseRoom);
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

exports.markCompleted = async (req, res) => {
  const { courseId, lessonId } = req.body;
  const studentId = req.user._id;

  // console.log(req.body)
  // console.log(studentId)
  // return

  // Check if the lesson is already marked as completed by the specific student
  const existingLesson = await CompletedLesson.findOne({
    studentId: studentId,
    courseId: courseId,
    lesson: lessonId,
  }).exec();

  if (existingLesson) {
    // The lesson is already completed by this student, no further action needed
    res.json({ ok: true });
  } else {
    // Check if there's an existing document for this student and course
    const existing = await CompletedLesson.findOne({
      studentId: studentId,
      courseId: courseId,
    }).exec();

    if (existing) {
      // Update the existing document by adding the new lessonId to the 'lesson' array
      const updated = await CompletedLesson.findOneAndUpdate(
        { studentId: studentId, courseId: courseId },
        { $addToSet: { lesson: lessonId } }
      ).exec();
      res.json({ ok: true });
    } else {
      // Create a new document for this student and course with the completed lesson
      const created = await new CompletedLesson({
        studentId: studentId,
        courseId: courseId,
        lesson: lessonId,
      }).save();
      res.json({ ok: true });
    }
  }
};


exports.listCompleted = async (req, res) => {
  try {
    const list = await CompletedLesson.findOne({
      studentId: req.user._id,
      courseId: req.body.courseId,
    }).exec();
    list && res.json(list.lesson)
  } catch (err) {
    res.json(err)
  }
}

exports.listCompletedQuiz = async (req, res) => {
  try {
    const listQuiz = await CompletedQuiz.findOne({
      studentId: req.user._id,
      courseId: req.body.courseId,
    }).exec();
    listQuiz && res.json(listQuiz.quiz)
  } catch (err) {
    res.json(err)
  }
}

exports.listCompletedExercises = async (req, res) => {
  try {
    const listExercise = await ExerciseAnswer.findOne({
      studentId: req.user._id,
      courseId: req.body.courseId,
    }).exec();
    listExercise && res.json(listExercise.exercise)
  } catch (err) {
    res.json(err)
  }
}

exports.markCompletedQuiz = async (req, res) => {
  const { courseId, quizId } = req.body;

  const existingQuiz = await CompletedQuiz.findOne({
    quiz: quizId
  }).exec();

  const existing = await CompletedQuiz.findOne({
    studentId: req.user._id,
    courseId: courseId,
  }).exec();
  if (existingQuiz) {
  } else {
    if (existing) {
      // update
      const updated = await CompletedQuiz.findOneAndUpdate({
        studentId: req.user._id,
        courseId: courseId
      },
        {
          $addToSet: { quiz: quizId },
        }
      ).exec();
      res.json({ ok: true });
    } else {
      // create
      const created = await new CompletedQuiz({
        studentId: req.user._id,
        courseId: courseId,
        quiz: quizId,
      }).save();
      res.json({ ok: true })
    }
  }
};

exports.addQuizScore = async (req, res) => {
  try {
    // Assuming the required data is present in the request body
    const { courseId, courseRoomId, sectionId, quizId, score, attempts } = req.body;
    const studentId = req.user._id;

    // Create a new quiz score entry
    const quizScore = new QuizScore({
      courseId,
      courseRoomId,
      sectionId,
      quizId,
      studentId,
      score,
      attempts
    });


    // Save the quiz score to the database
    await quizScore.save();

    // Respond with success
    res.status(200).json({ success: true, message: 'Quiz score submitted successfully.' });
  } catch (error) {
    console.error('Error submitting quiz score:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.getQuizScore = async (req, res) => {
  const { quizId } = req.params;
  const studentId = req.user._id;


  try {
    // Find the assignment by its _id using findById
    const stdQuizScore = await QuizScore.find({ studentId: studentId, quizId: quizId });

    console.log(stdQuizScore);

    // Check if any submissions were found
    if (!stdQuizScore) {
      // If no submission or no fileSubmit, student hasn't submitted
      return res.status(404).json({ error: 'student quiz score not found' });
    }

    res.json(stdQuizScore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching quiz score.' });
  }
};

exports.stdSubmitQuiz = async (req, res) => {
  const studentId = req.user._id;

  try {
    // Find the assignment by its _id using findById
    const stdSubmit = await QuizScore.findOne({ studentId: studentId });

    console.log(stdSubmit);

    // Check if any submissions were found
    if (!stdSubmit) {
      // If no submission or no fileSubmit, student hasn't submitted
      return res.status(404).json({ error: 'student quiz score not found' });
    }

    res.json(stdSubmit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching quiz score.' });
  }
};

exports.markExercise = async (req, res) => {
  const { courseId, exerciseId } = req.body;

  const existing = await ExerciseAnswer.findOne({
    studentId: req.user._id,
    courseId: courseId,
  }).exec();

  if (existing) {
    // update
    const updated = await ExerciseAnswer.findOneAndUpdate({
      studentId: req.user._id,
      courseId: courseId
    },
      {
        $addToSet: { exercise: exerciseId },
      }
    ).exec();
    res.json({ ok: true });
  } else {
    // create
    const created = await new ExerciseAnswer({
      studentId: req.user._id,
      courseId: courseId,
      exercise: exerciseId,
    }).save();
    res.json({ ok: true })
  }
};


exports.listExercise = async (req, res) => {
  try {
    const listExercise = await ExerciseAnswer.findOne({
      studentId: req.user._id,
      courseId: req.body.courseId,
    }).exec();
    listExercise && res.json(listExercise.exercise)
  } catch (err) {
    res.json(err)
  }
}


exports.getCourseRoomStd = async (req, res) => {
  const { id, studentId } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "Invalid courseId" });
    }

    // Use populate to retrieve Course and CourseYear data
    const courseRoom = await CourseRoom.findOne({ courseId: id, studentId: studentId });

    if (courseRoom) {
      res.json(courseRoom);
      console.log(courseRoom);
    } else {
      res.status(403).json({ error: "Student is not enrolled in the course" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

