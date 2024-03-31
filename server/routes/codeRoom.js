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
    submitCode
} = require("../controllers/codeRoom")


router.post("/codeRoom/:courseId/:courseYearId", auth, create);
router.post("/join-room", joinRoom);
router.get("/codeRoom", auth, getCodeRoom);
router.get("/problem/:codeRoomId", auth, getProblem);
router.post("/codeRoom/submit/",auth, submitCode );


module.exports = router;
