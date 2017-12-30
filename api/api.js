const express = require('express');

const todoController = require('../controllers/todos');
const AuthController = require('../controllers/auth');
const router = express.Router();

router.post('/todo', todoController.createTodo);
router.get('/todos', todoController.getTodos);
router.delete('/todo/:todoid', todoController.deleteTodo);

router.post('/login', AuthController.postLogin);
router.get('/logout', AuthController.getLogout);
router.post('/register', AuthController.postRegister);

module.exports = router;
