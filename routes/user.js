const path = require('path');

const express = require('express');

const userController = require('../controllers/user');
// const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/addtodo', userController.postAddTodo);
router.post('/deletedTodo', userController.postDeleteTodo);
router.post('/getTodo', userController.getTodo);

module.exports = router;
