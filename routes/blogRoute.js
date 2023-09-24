const express = require('express');
const protectRoute = require('../middleware/auth')
const { createPost,getPost,getAllPost,deletePost } = require('../controllers/blogController')
const router = express.Router();

router.post('/post', protectRoute, createPost);
router.get('/get/:id', protectRoute, getPost);
router.delete('/delete/:id', protectRoute, deletePost);
router.get('/get', protectRoute, getAllPost);

module.exports = router;
