const express = require("express");
const router = express.Router();

//middleware
const { 
    auth
} = require('../middlewares/index')

//controllers
const  { 
    addSection,
    getSection,
    updateSection,
    removeSection,
    getSectionRead,
 } = require ('../controllers/section')


 router.post("/section/:courseYearId/:courseId",auth, addSection);
 router.get("/section", auth, getSection)
 router.get("/section/:id", auth, getSectionRead)
router.put("/section/:id/:sectionId",auth, updateSection);
router.delete("/section/:sectionId",auth, removeSection);





module.exports = router;
