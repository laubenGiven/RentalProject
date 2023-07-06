const express = require('express');
const CommentController = require('../controllers/CommentController');

const router = express.Router();
const commentController = new CommentController();

// Route for adding a like to a comment
router.put('/comment/:id/like', async (req, res) => {
  try {
    await commentController.addLike(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add like' });
  }
});

// Route for adding a dislike to a comment
router.put('/comment/:id/dislike', async (req, res) => {
  try {
    await commentController.addDislike(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add dislike' });
  }
});

module.exports = router;
