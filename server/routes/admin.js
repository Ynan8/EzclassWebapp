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
    removeStudent,
    getCourseYearId,
    getTotalCompleted,
    getCourseYearIdByCourse,
    getRoomProgress,
    
} = require("../controllers/admin")

router.post("/add-teacher", addTeacher);
router.get("/teacher-courses/:teacherId", auth, TeacherCoursesAll);
router.get("/teacher/:teacherId", auth, getTeacher);
router.put("/teacher/:tchId", auth, UpdateTeacher);
router.delete('/delete-teacher/:id', auth, removeTeacher);
router.delete('/delete-student/:id', auth, removeStudent);


router.get("/admin/getCourseYearId/:id", auth, getCourseYearId);

router.get('/total-completed/:courseId', getTotalCompleted);
router.get('/courseYearIdByCourse/:courseId', getCourseYearIdByCourse);

router.get("/room-progress/:courseYearId", getRoomProgress);



module.exports = router;