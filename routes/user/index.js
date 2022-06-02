const express = require('express');
const router = new express.Router();
const userController = require('../../controllers/UserController')


router.get('/login/logout',userController.logout)

router.get('/login', userController.login ) 

router.post('/login',userController.loginCheck)

router.get('/login/new', userController.loginNew) 

router.post('/login/new', userController.loginNewSend)  

router.get('/login/new/confirm', userController.loginConfirm)  

router.post('/login/new/confirm', userController.loginConfirmSend)  
   
module.exports = router;
