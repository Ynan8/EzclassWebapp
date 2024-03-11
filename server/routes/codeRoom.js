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

} = require("../controllers/codeRoom")


router.post("/codeRoom/:courseId/:courseYearId", auth, create);
router.get("/codeRoom", auth, getCodeRoom);


module.exports = router;
