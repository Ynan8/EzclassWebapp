const express = require("express");
const router = express.Router();

//middleware
const { auth } = require('../middlewares/index')

//controllers
const  { 
    StudentCourses,
    getCourseYearId,
    getCourseRoomId,
    studentList,
    markCompleted,
    listCompleted,
    markCompletedQuiz,
    listCompletedQuiz,
    addQuizScore,
    getQuizScore,
    stdSubmitQuiz,
    markExercise,
    listExercise,
    getCourseRoomStd,
    listCompletedExercises,
 } = require ('../controllers/student')


router.get("/student-courses", auth, StudentCourses);
router.get("/std/getCourseYearId/:id", auth, getCourseYearId);
router.get("/std/getCourseRoomId/:id", auth, getCourseRoomId);
router.get("/list-student",auth, studentList);

//completed lesson
router.post('/mark-completed',auth, markCompleted)
router.post('/list-completed',auth, listCompleted)

//completed quiz
router.post('/mark-completedQuiz',auth, markCompletedQuiz)
router.post('/list-completedQuiz',auth, listCompletedQuiz)

router.post("/quizScore/", auth, addQuizScore);
router.get("/quizScore/:quizId", auth, getQuizScore);
router.get("/quizScore/", auth, stdSubmitQuiz);


//exercise lesson
router.post('/mark-exercise',auth, markExercise)
router.post('/list-exercise',auth, listExercise)
router.post('/list-completedExercises',auth, listCompletedExercises)




router.get("/courseRoomStd/:id/:studentId", getCourseRoomStd);

module.exports = router;
