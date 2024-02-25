const express = require('express');

const router = express.Router();


//controller
const { 
    register,
    login ,
} = require("../controllers/auth")

router.get("/", (req, res) => {
    res.send("hello api");
});


router.post("/register", register);
router.post("/login", login);


module.exports = router;