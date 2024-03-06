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
 } = require ('../controllers/teacher')


router.get("/teacher-courses",auth, TeacherCourses);


router.post("/import-students/:courseRoomId", auth, ImportStudent);
router.get("/studentRoom/:id", auth, getStdRoom);
router.get("/list-teacher",auth, teacherList);



module.exports = router;
