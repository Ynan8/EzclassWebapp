const express = require('express');

const router = express.Router();


// middleware
const { 
auth,
} = require('../middlewares');

//controller
const { 
 
    create,
    getCodeRoom,
    getProblem,
    joinRoom,
    submitCode,
    getStdSubmitCode,
    getStdSubmitCodeAll,
    getStdSubmitCodeCourse,
    deleteCodeRoom,
} = require("../controllers/codeRoom")


router.post("/codeRoom/:courseId/:courseYearId", auth, create);
router.post("/join-room", joinRoom);
router.get("/codeRoom", auth, getCodeRoom);
router.get("/problem/:codeRoomId", auth, getProblem);
router.get("/std-submitCode/:codeRoomId", auth, getStdSubmitCode);
router.get("/std-submitCodeAll/:courseId", auth, getStdSubmitCodeAll);
router.get("/std-submitCodeCourse/:courseId", auth, getStdSubmitCodeCourse);
router.post("/codeRoom/submit/",auth, submitCode );

router.delete('/delete-codeRoom/:id', auth, deleteCodeRoom);



module.exports = router;
