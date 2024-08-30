const express = require('express');
const router = express.Router();
const { loginController, registerController } = require('../controllers/index')

//API for the server
router.post('/usersignup', registerController.register);
router.post('/login', loginController.login);
router.post('/verify', loginController.verify);

module.exports = router;

