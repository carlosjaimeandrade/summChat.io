const express = require('express');
const router = new express.Router();
const userAuth = require('../../middleware/userAuth');
const HomeController = require('../../controllers/HomeController')

router.get('/home', userAuth, HomeController.userHome)


module.exports = router;