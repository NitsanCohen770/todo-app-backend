const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');

const router = express.Router();
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
module.exports = router;
