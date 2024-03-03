const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

// GET all users
router.get('/', (req, res) => {
    res.json({mssg: 'GET all users'});
});

// GET one user
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET one user'});
});

// POST one user
router.post('/register', controller.registerUser);

module.exports = router;