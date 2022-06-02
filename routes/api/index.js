const express = require('express');
const router = new express.Router();
const userAuth = require('../../middleware/userAuth');
const ApiController = require('../../controllers/ApiController')

router.post('/msg/', userAuth, ApiController.create)
router.get('/msgs/:offset/:codigo', userAuth, ApiController.msgs)
router.get('/news/:user', userAuth, ApiController.newMsg)


module.exports = router;