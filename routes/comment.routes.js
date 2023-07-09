const express = require('express');
const CommentController = require('../controllers/comment.controller');
const CommentRepository = require('../repository/comment.repository')

const router = express.Router();
const commentController = new CommentController();


// Comments Routes
router.get('/comments', commentController.getAll);
router.get('/comments/:id', commentController.getById);
router.post('/postcomments', commentController.add);
router.put('/comments/:id', commentController.update);
router.delete('/comments/:id', commentController.deleteById);


// Route for creating a new comment
router.post('/Postcomment', async (req, res) => {
    try {
      // Call the create method of the CommentController
      const result = await commentController.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create comment' });
    }
  });




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
