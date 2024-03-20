const express = require('express');
const router = express.Router();
const controller = require('../controllers/postsController');

// GET all users
router.get('/', controller.getAllPosts);

// GET one post
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET one post'});
});
// POST a post
router.post('/post', controller.postPost);

router.get('/create', controller.create);

module.exports = router;