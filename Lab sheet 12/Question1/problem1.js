const express = require('express');
const userRoutes = require('./users');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Express User Management API is running' });
});

app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        message: 'Please use /api/users or /api/users/:id'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
