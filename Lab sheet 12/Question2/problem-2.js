const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

const authMiddleware = (req, res, next) => {
    req.user = { id: 101, name: 'Prasanth' };
    next();
};

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.id === 101) {
        next();
    } else {
        res.status(403).json({ error: 'Admin access required' });
    }
};

app.use(requestLogger);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Middleware Demo API' });
});

app.get('/public', (req, res) => {
    res.json({ message: 'This is a public route - no authentication required' });
});

app.get('/profile', authMiddleware, (req, res) => {
    res.json({ 
        message: 'Profile accessed successfully',
        user: req.user 
    });
});

app.get('/admin/dashboard', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ 
        message: 'Admin Dashboard',
        data: 'Sensitive admin information here'
    });
});

app.post('/users', authMiddleware, (req, res) => {
    res.status(201).json({ 
        message: 'User created',
        body: req.body 
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
