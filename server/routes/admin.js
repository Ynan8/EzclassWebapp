const express = require('express');

const router = express.Router();


// middleware
const { 
auth,
} = require('../middlewares');

//controller
const { 
    addTeacher

} = require("../controllers/admin")

router.post("/add-teacher", addTeacher);











module.exports = router;