const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');

router.get('/', homeController.userMiddleware, homeController.index);
router.get('/users/login', userController.login);
router.get('/users/register', userController.register);

module.exports = router;