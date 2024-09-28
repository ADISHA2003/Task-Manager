const pg = require('pg'); // Install with: npm install pg

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL, // Vercel provides this
    ssl: process.env.NODE_ENV === 'production' // Important for security
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1); // Stop the process if there's a database error
});

module.exports = pool;
