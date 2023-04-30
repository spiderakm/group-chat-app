const express = require('express')
const router = express.Router();

const userController = require('../controllers/usercontroller');
//signup


router.post('/signup', userController.createNewUser);



module.exports = router;