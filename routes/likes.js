const express = require('express');
const router = express.Router();
const { addLike, removeLike, getLikesByUser, toggleLike } = require('../controllers/likes');
const { auth } = require('../middleware/auth');

router.post('/toggle', auth, toggleLike);
router.post('/add', auth, addLike);
router.delete('/remove/:id', auth, removeLike);
router.get('/user/:userId', getLikesByUser);


module.exports = router;
