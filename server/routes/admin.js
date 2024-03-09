const express = require('express');

const router = express.Router();


// middleware
const { 
auth,
} = require('../middlewares');

//controller
const { 
    addTeacher,
    TeacherCoursesAll,
    getTeacher,
    
} = require("../controllers/admin")

router.post("/add-teacher", addTeacher);
router.get("/teacher-courses/:teacherId", auth, TeacherCoursesAll);
router.get("/teacher/:teacherId", auth, getTeacher);












module.exports = router;