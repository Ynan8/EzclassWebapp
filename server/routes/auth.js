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
} = require("../controllers/auth")

router.get("/auth", (req,res) => {
    res.send('Hello auth End')
})

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user",auth, currentUser);






module.exports = router;