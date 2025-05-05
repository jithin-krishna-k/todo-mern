const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working...' });
});

app.get('/', (req, res) => {
    res.json("welcome to home.");
});

app.use('/api/todos', todoRoutes);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
