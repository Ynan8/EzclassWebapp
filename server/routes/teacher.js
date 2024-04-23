const express = require("express");
const router = express.Router();

//middleware
const {
    auth
} = require('../middlewares/index')

//controllers
const {
    TeacherCourses,
    ImportStudent,
    getStdRoom,
    removeStudent,
    teacherList,
    getQuizScoreCourse,
    averageScores,
    addStudent,
    addStudentCourse,
    averageScoresRoom,
    getQuizScoreRoom,
    getStudentData,
    getSectionData,
    getAssignmentRoom,
    UpdateStudent,
    ImportStudentCourse
} = require('../controllers/teacher')


router.get("/teacher-courses", auth, TeacherCourses);


router.post("/import-students", auth, ImportStudent);
router.post("/import-students/:id", auth, ImportStudentCourse);
router.post("/add-student", addStudent);
router.post("/add-student/:id", addStudentCourse);
router.get("/studentRoom/:id", auth, getStdRoom);
router.get("/list-teacher", auth, teacherList);

router.get("/quizScoreCourse/:courseId", auth, getQuizScoreCourse);
router.get("/quizScoreRoom/:roomId", auth, getQuizScoreRoom);
router.get("/assignmentRoom/:id", auth, getAssignmentRoom);

router.get("/average-scores/:courseYearId", auth, averageScores);
router.get("/average-scores-room/:courseYearId/:courseRoomId", auth, averageScoresRoom);


router.get("/user/:userId", auth, getStudentData);
router.get("/section/:sectionId", auth, getSectionData);
router.delete("/courseRoom/:idStudent/:id",removeStudent);
router.put("/student/:id", auth, UpdateStudent);



module.exports = router;
