const express = require("express");
const router = express.Router();

//middleware
const {
    auth
} = require('../middlewares/index')

//controllers
const {
    sendMessage,
    getMessages,
} = require('../controllers/message')


router.post("/messages/send/:id/", auth, sendMessage);
router.get("/messages/:codeRoomId", auth, getMessages);



module.exports = router;
