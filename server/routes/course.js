const express = require("express");


const router = express.Router();

// middleware
const {
    auth,
} = require('../middlewares');

// controllers
const {
    courseList,
    uploadImage,
    removeImage,
    create,
    update,
    deleteCourse,
    read,
    archivedCourse,
    cancelArchivedCourse,
} = require('../controllers/course');

router.get("/list-course",auth, courseList);


// image
router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);

router.post("/course/", auth, create);
router.put("/course/:id", auth, update);
router.get("/course/:id", read);

router.delete('/delete-course/:id', auth, deleteCourse);

router.put('/archived-course/:id', auth, archivedCourse);

router.put('/cancel-archived-course/:id', auth, cancelArchivedCourse);






module.exports = router;