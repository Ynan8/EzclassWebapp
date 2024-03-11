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
    currentUser,
    profileImage,
    UpdateProfile,
    UpdatePassword,
    
} = require("../controllers/auth")

router.get("/auth", (req,res) => {
    res.send('Hello auth End')
})

router.get("/", (req, res) => {
    res.send("hello api");
});

router.post("/course/profile-image", profileImage);
router.put("/updateProfile/:id", auth, UpdateProfile);
router.put("/update-password", auth, UpdatePassword);


router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user",auth, currentUser);

module.exports = router;
