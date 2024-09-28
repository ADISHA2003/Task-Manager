const pool = require('../db/database'); // Use the updated database connection

const Task = {
    getAllTasks: async () => {
        try {
            const result = await pool.query('SELECT * FROM tasks'); // Use PostgreSQL query
            return result.rows;
        } catch (err) {
            throw err; 
        }
    },
    createTask: async (name) => {
        try {
            const result = await pool.query('INSERT INTO tasks (name) VALUES ($1) RETURNING id', [name]); // Use parameterized query and return ID
            return result.rows[0].id; // Return the newly created task ID
        } catch (err) {
            throw err;
        }
    },
    deleteTask: async (id) => {
        try {
            await pool.query('DELETE FROM tasks WHERE id = $1', [id]); // Use parameterized query
        } catch (err) {
            throw err;
        }
    }
};

module.exports = Task;
