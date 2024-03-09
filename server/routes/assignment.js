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
    removeAssignment,
    readAssignment,
    updateAssignment,
    getAssignmentSubmit,
    submitAssignment,
    removeSubmit,
    CheckSubmit,
} = require('../controllers/assignment')


router.post("/assignment", auth, addAssignment)
router.post("/assignmentFile-upload", auth, formidable(), uploadAssignmentFile)
router.get('/assignment/:assignmentId',auth, getAssignment);
router.delete("/assignment/:assignmentId", auth, removeAssignment);
router.get('/readAssignment/:id',auth, readAssignment);
router.put("/updateAssignment/:assignmentId", auth, updateAssignment);


//std
router.post("/assignment/submit/:id/",auth, submitAssignment );
router.get("/assignment/submit/:id/",auth, getAssignmentSubmit);   
router.post("/assignment/remove-submit",auth, removeSubmit );

router.get('/check-submit/:id', auth, CheckSubmit);











module.exports = router;
