const express = require('express')
const router = express.Router();
const authenticateUser = require('../middlewares/auth')
const chatController = require('../controllers/chatcontroller')


router.post('/message',authenticateUser.userAuthontication,chatController.userMessage)
router.get("/showMessage",chatController.showMessage)
module.exports = router