const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const {
    createPost,
    getAllPosts,
    getPostsByUser,
    getPostById,
    updatePost,
    deletePost,
    toggleLike,
    addComment
} = require('../controller/post.controller');

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.get('/user/:userId', getPostsByUser);

// Protected routes
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/like', auth, toggleLike);
router.post('/:id/comment', auth, addComment);

module.exports = router; 