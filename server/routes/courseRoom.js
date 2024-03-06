const express = require("express");
const router = express.Router();

//middleware
const {
    auth
} = require('../middlewares/index')

//controllers
const {
    addCourseRoom,
    getCourseRoom,
    updateCourseRoom,
    deleteCourseRoom,
} = require('../controllers/courseRoom')


router.post("/add-courseRoom", addCourseRoom);
router.get("/courseRoom/:id", getCourseRoom);
router.put("/courseRoom/:id", auth, updateCourseRoom);
router.delete('/delete-courseRoom/:id', auth, deleteCourseRoom);







module.exports = router;