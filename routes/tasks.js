const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// Get all tasks
router.get('/', (req, res) => {
    Task.getAllTasks((tasks, err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve tasks' });
        }
        res.json(tasks);
    });
});

// Add a new task
router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Task name is required' });
    }
    Task.createTask(name, (id, err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add task' });
        }
        res.status(201).json({ id });
    });
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Task.deleteTask(id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete task' });
        }
        res.status(204).end();
    });
});

module.exports = router;
