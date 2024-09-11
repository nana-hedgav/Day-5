const express = require('express');
const Todo = require('../models/todo');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Get all todos
router.get('/', authenticate, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new todo
router.post('/', authenticate, async (req, res) => {
    const { description, date } = req.body;
    if (!description || !date) return res.status(400).json({ message: 'All fields are required' });

    try {
        const todo = new Todo({
            id: Date.now().toString(),
            description,
            date,
            userId: req.user.id
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a todo
router.put('/:id', authenticate, async (req, res) => {
    const { description, date } = req.body;
    if (!description || !date) return res.status(400).json({ message: 'Description and date are required' });

    try {
        const todo = await Todo.findOneAndUpdate(
            { id: req.params.id, userId: req.user.id },
            { description, date },
            { new: true }
        );
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a todo
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ id: req.params.id, userId: req.user.id });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Toggle todo status
router.patch('/:id/toggle', authenticate, async (req, res) => {
    try {
        const todo = await Todo.findOne({ id: req.params.id, userId: req.user.id });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        todo.is_checked = !todo.is_checked;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
