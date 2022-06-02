const express = require('express');
const router = new express.Router();
const userAuth = require('../../middleware/userAuth');
const ChatController = require('../../controllers/ChatController')

router.get('/chat/:name', userAuth, ChatController.chat)

module.exports = router;