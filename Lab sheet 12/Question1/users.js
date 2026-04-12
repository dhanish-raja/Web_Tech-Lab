const express = require('express');
const router = express.Router();

let users = [
    { id: 1, name: "Prasanth", email: "prasanth@example.com", age: 21 },
    { id: 2, name: "Rahul Sharma", email: "rahul@example.com", age: 22 },
    { id: 3, name: "Priya Reddy", email: "priya@example.com", age: 20 }
];

let idCounter = 4;

router.get('/', (req, res) => {
    res.json(users);
});

router.post('/', (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const newUser = {
        id: idCounter++,
        name,
        email,
        age: age || null
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const { name, email, age } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (age !== undefined) user.age = age;
    res.json(user);
});

router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(index, 1);
    res.json({ message: 'User deleted successfully' });
});

module.exports = router;