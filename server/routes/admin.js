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
    UpdateTeacher,
    removeTeacher,
    getCourseYearId,
    
} = require("../controllers/admin")

router.post("/add-teacher", addTeacher);
router.get("/teacher-courses/:teacherId", auth, TeacherCoursesAll);
router.get("/teacher/:teacherId", auth, getTeacher);
router.put("/teacher/:tchId", auth, UpdateTeacher);
router.delete('/delete-teacher/:id', auth, removeTeacher);
router.get("/admin/getCourseYearId/:id", auth, getCourseYearId);











module.exports = router;