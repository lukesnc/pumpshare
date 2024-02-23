require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo'); // Session store for MongoDB
const exercisesRoutes = require('./routes/exercises');
const mainRoutes = require('./routes/main');

// Express App
const app = express();

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app. listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT)
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
