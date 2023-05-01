const express = require('express')
const router = express.Router();
const authenticateUser = require('../middlewares/auth')
const groups = require('../controllers/groups')

router.post("/addName",authenticateUser.userAuthontication,groups.groupNames)

router.get("/getName",authenticateUser.userAuthontication,groups.getAllGroupNames)

module.exports=router