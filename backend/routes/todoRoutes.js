const express = require('express');
const router = express.Router();

const {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController');

router.get('/', getTodos);
router.post('/', createTodo);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
