const express = require("express");
const router = express.Router();
const formidable = require ('express-formidable')


//middleware
const {
    auth
} = require('../middlewares/index')

//controllers
const {
    addAssignment,
    uploadAssignmentFile,
    getAssignment,
    

} = require('../controllers/assignment')


router.post("/assignment", auth, addAssignment)
router.post("/assignmentFile-upload", auth, formidable(), uploadAssignmentFile)
router.get('/assignment/:assignmentId',auth, getAssignment);









module.exports = router;
