const express = require('express');
const router = express.Router();
// const controller = require('../controllers/exercisesController');

// GET all exercises
router.get('/', (req, res) => {
    res.json({mssg: 'GET all exercises'});
});

// GET one exercise
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET one exercise'});
});

// POST one exercise
router.post('/', (req, res) => {
    res.json({mssg: 'POST one exercise'});
});

// DELETE one exercise
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE one exercise'});
});

// UPDATE one exercise
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE one exercise'});
});

module.exports = router;