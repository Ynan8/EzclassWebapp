const express = require("express");
const router = express.Router();

//middleware
const {
    auth
} = require('../middlewares/index')

//controllers
const {
    addCourseYear,
    getCourseYear,
    updateCourseYear,
    archivedCourseYear,
    cancelArchivedCourseYear,
    deleteCourseYear,
    getSingleCourseYear
} = require('../controllers/courseYear')

router.post("/add-courseYear",auth, addCourseYear);
router.get("/courseYear/:id", getCourseYear);
router.put("/courseYear/:id", auth, updateCourseYear);
router.delete('/delete-courseYear/:id', auth, deleteCourseYear);


router.put('/archived-courseYear/:id', auth, archivedCourseYear);
router.put('/cancel-archived-courseYear/:id', auth, cancelArchivedCourseYear);
router.get("/courseYear/single/:id", getSingleCourseYear);





module.exports = router;
