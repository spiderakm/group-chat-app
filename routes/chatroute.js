const express = require('express')
const router = express.Router();
const authenticateUser = require('../middlewares/auth')
const chatController = require('../controllers/chatcontroller')


router.post('/message',authenticateUser.userAuthontication,chatController.userMessage)

router.get("/allUsers",chatController.getAllUsers)

router.post("/addToGroup",chatController.addToGroup)

router.get("/getUsers",authenticateUser.userAuthontication,chatController.getpreferedUsers)

router.post("/removeMember",chatController.removeMember)

router.get("/showMessage",chatController.showMessage)

router.post("/saveFile",chatController.uploadtoS3)

module.exports = router