const express = require("express");
const router = express.Router();

//middleware
const { auth } = require('../middlewares/index')

//controllers
const  { 
    StudentCourses,
    getCourseYearId,
    studentList,
   
 } = require ('../controllers/student')


router.get("/student-courses", auth, StudentCourses);

router.get("/std/getCourseYearId/:id", auth, getCourseYearId);




router.get("/list-student",auth, studentList);




module.exports = router;
