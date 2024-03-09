const express = require("express");
const router = express.Router();

//middleware
const { 
    auth
} = require('../middlewares/index')

//controllers
const  { 
    TeacherCourses,
    ImportStudent,
    getStdRoom,
    teacherList,
    getQuizScoreCourse,
    averageScores,
    addStudent
 } = require ('../controllers/teacher')


router.get("/teacher-courses",auth, TeacherCourses);


router.post("/import-students/:courseRoomId", auth, ImportStudent);
router.post("/add-student/:id", addStudent);
router.get("/studentRoom/:id", auth, getStdRoom);
router.get("/list-teacher",auth, teacherList);

router.get("/quizScoreCourse/:courseId", auth, getQuizScoreCourse);

router.get("/average-scores/:courseYearId", auth, averageScores);



module.exports = router;
