const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

// GET all users
router.get('/', (req, res) => {
    res.json({mssg: 'GET all users'});
});

// GET one user
router.get('/:username', controller.getProfile);


router.post('/login', controller.loginUser);

router.post('/register', controller.registerUser);

module.exports = router;