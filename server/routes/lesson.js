const express = require("express");
const router = express.Router();

//middleware
const {
    auth
} = require('../middlewares/index')

//controllers
const {
    addContentLesson,
    getLesson,
    removeLesson,
    readLesson,
    updateContentLesson
} = require('../controllers/lesson')


router.post("/section/addContentLesson", auth, addContentLesson)
router.get('/lesson/:lessonId', auth, getLesson);
router.delete("/lesson/:lessonId", auth, removeLesson);
router.get('/readLesson/:id',auth, readLesson);
router.post("/section/updateContentLesson/:id", auth, updateContentLesson);







module.exports = router;
