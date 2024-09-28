const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Modify to handle the path correctly and avoid duplication of 'db'
const dbPath = process.env.DB_PATH 
    ? path.resolve(process.env.DB_PATH)  // Use absolute path if DB_PATH is set
    : path.join(__dirname, 'db', 'tasks.db');  // Default to 'db/tasks.db' in the current project folder

// Create or connect to the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(`Error opening the database at path ${dbPath}:`, err.message);
    } else {
        console.log(`Connected to the database at ${dbPath}`);
        
        // Create the tasks table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating the tasks table:', err.message);
            } else {
                console.log('Tasks table ensured/created successfully.');
            }
        });
    }
});

module.exports = db;
