require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const tasksRoute = require('./routes/tasks');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tasks', tasksRoute);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
