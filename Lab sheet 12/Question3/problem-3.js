const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/vitap-crud-db')
    .then(async () => {
        console.log('Connected to MongoDB');
        await seedUsers();
    })
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0 },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function seedUsers() {
    try {
        const count = await User.countDocuments();
        if (count === 0) {
            const initialUsers = [
                { name: "Prasanth", email: "prasanth@example.com", age: 21 },
                { name: "Rahul Sharma", email: "rahul@example.com", age: 22 },
                { name: "Priya Reddy", email: "priya@example.com", age: 20 },
                { name: "Aarav Kumar", email: "aarav@example.com", age: 23 },
                { name: "Sneha Patel", email: "sneha@example.com", age: 19 }
            ];
            await User.insertMany(initialUsers);
            console.log('✅ 5 sample users seeded successfully!');
        } else {
            console.log(`📊 ${count} users already exist in database`);
        }
    } catch (err) {
        console.error('Seeding error:', err.message);
    }
}

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'Mongoose CRUD API is running' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
