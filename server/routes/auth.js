const express = require('express');

const router = express.Router();


// middleware
const { 
auth,
} = require('../middlewares');

//controller
const { 
    register,
    login ,
    logout,
    loginAdmin,
    currentUser,
    profileImage,
    UpdateProfile,
    UpdatePassword,
    UpdateProfileAdmin,
    UpdatePasswordAdmin,
    currentTeacher,
    currentStudent,
    currentAdmin,
    courseLogs,
    getCourseLogs,
    sendTestEmail,
    forgotPassword,
    resetPassword,
    getAdmin
    
} = require("../controllers/auth")

router.get("/auth", (req,res) => {
    res.send('Hello auth End')
})

router.get("/", (req, res) => {
    res.send("hello api");
});

router.post("/course-logs", courseLogs);
router.get("/course-logs/:id", getCourseLogs);
router.post("/course/profile-image", profileImage);
router.put("/updateProfile/:id", auth, UpdateProfile);
router.put("/update-password", auth, UpdatePassword);
router.put("/updateProfile-admin/:id", auth, UpdateProfileAdmin);
router.put("/update-passwordAdmin", auth, UpdatePasswordAdmin);




router.post("/register", register);
router.post("/login", login);
router.post("/login-admin", loginAdmin);
router.get("/logout", logout);
router.get("/current-user",auth, currentUser);
router.get("/current-teacher",auth, currentTeacher);
router.get("/current-student",auth, currentStudent);
router.get("/current-admin",auth, currentAdmin);
router.get("/send-email", sendTestEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/admin/:adminId", auth, getAdmin);



module.exports = router;
