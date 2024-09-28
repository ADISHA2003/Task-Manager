const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// Get all tasks
router.get('/', async (req, res) => { // Make the route handler async
    try {
        const tasks = await Task.getAllTasks(); // Use await to get tasks
        res.json(tasks);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
});

// Add a new task
router.post('/', async (req, res) => { // Make the route handler async
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Task name is required' });
        }

        const newTaskId = await Task.createTask(name); // Use await to get the ID
        res.status(201).json({ id: newTaskId }); 

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to add task' });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => { // Make the route handler async
    try {
        const { id } = req.params;
        await Task.deleteTask(id); // Use await for the delete operation
        res.status(204).end(); 
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

module.exports = router;
