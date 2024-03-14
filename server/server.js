require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo'); // Session store for MongoDB
const mainRoutes = require('./routes/main');
const exercisesRoutes = require('./routes/exercises');
const usersRoutes = require('./routes/users');

// Express App
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database successfully');
        app. listen(process.env.PORT, host, port, () => {
            console.log(`Server running at http://${host}:${port}/`)
        });
    })
    .catch((error) => {
        console.log(error);
    })

// Middleware
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies 
app.use(express.static('public')); // Serve static files
// For debugging purposes
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/', mainRoutes);
app.use('/api/exercises',exercisesRoutes);
app.use('/api/users', usersRoutes);