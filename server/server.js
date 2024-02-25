require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo'); // Session store for MongoDB
const exercisesRoutes = require('./routes/exercises');
const mainRoutes = require('./routes/main');

// Express App
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app. listen(process.env.PORT, host, port, () => {
            console.log(`Server running at http://${host}:${port}/`)
        });
    })
    .catch((error) => {
        console.log(error);
    })

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/', mainRoutes);
app.use('/exercises',exercisesRoutes);