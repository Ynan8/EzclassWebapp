const express = require("express");
const router = express.Router();

//middleware
const {
    auth
} = require('../middlewares/index')

//controllers
const {
    addQuiz,
    getQuiz,
    readQuiz,
    updateQuiz,
    removeQuiz
} = require('../controllers/quiz')


router.get('/quiz/:quizId',auth, getQuiz);
router.post("/section/addQuiz", auth,  addQuiz)
router.get('/readQuiz/:id',auth, readQuiz);
router.post("/section/updateQuiz/:id", auth, updateQuiz);
router.delete("/quiz/:quizId", auth, removeQuiz);







module.exports = router;
