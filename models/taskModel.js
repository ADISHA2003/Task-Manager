const db = require('../db/database');

const Task = {
    getAllTasks: (callback) => {
        db.all('SELECT * FROM tasks', [], (err, rows) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
    },
    createTask: (name, callback) => {
        db.run('INSERT INTO tasks (name) VALUES (?)', [name], function(err) {
            if (err) {
                throw err;
            }
            callback(this.lastID);
        });
    },
    deleteTask: (id, callback) => {
        db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
            if (err) {
                throw err;
            }
            callback();
        });
    }
};

module.exports = Task;
