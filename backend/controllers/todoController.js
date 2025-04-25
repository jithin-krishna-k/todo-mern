const Todo = require('../models/Todo');

const TODO_STATUSES = ['pending', 'in-progress', 'completed'];

const createTodo = async (req, res) => {
    try {
        const { title, status } = req.body

        if (!title || title.trim() === '') {
            return res.status(400).json({ message: 'Title is required and cannot be empty.' });
        }

        if (status && !TODO_STATUSES.includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Allowed: pending, in-progress, completed.' });
        }
        const newTodo = new Todo({
            title: req.body.title,
            description: req.body.description,
            status: status || 'pending',
        });

        newTodo.save()
            .then(todo => res.status(201).json(todo))
            .catch(err => res.status(500).json({ message: 'Error saving todo', error: err }));
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

const getTodos = async (req, res) => {
    const todos = await Todo.find().sort({ updatedAt: -1 });
    res.json(todos);
};

const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { title, status } = req.body;

        if (title && title.trim() === '') {
            return res.status(400).json({ message: 'Title cannot be empty.' });
        }

        if (status && !TODO_STATUSES.includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Allowed: pending, in-progress, completed.' });
        }

        const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Todo not found' });
        res.json(updated);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid Todo ID' });
    }
};

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};
