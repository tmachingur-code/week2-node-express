require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Custom Middleware (Bonus)
app.use((req, res, next) => {

    console.log(`${req.method} ${req.url}`);

    next();
});


// HOME ROUTE
app.get('/', (req, res) => {

    res.send('My Week 2 API');

});


// POST ROUTE
app.post('/user', (req, res) => {
    const { name, email } = req.body;
    console.log(req.body);

    // check missing fields
    if (!name || !email) {
        return res.status(400).json({
            error: "Missing fields"
        });
    }

    // name validation 
    if (!isNaN(name)) {
        return res.status(400).json({
            error: "Name cannot be a number"
        });
    }

    // email validation
    if (!email.includes("@") || !email.includes(".")) {
        return res.status(400).json({
            error: "Invalid email format"
        });
    }

    res.send(`Hello ${name}`);
});


// DYNAMIC ROUTE
app.get('/user/:id', (req, res) => {

    const id = req.params.id;

    res.send(`User ${id} profile`);

});


// START SERVER
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});
