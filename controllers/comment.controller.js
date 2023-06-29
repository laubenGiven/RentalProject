const BaseController = require('./base.controller');
const Comment = require('../models/comment.models');

class CommentController extends BaseController {
  constructor() {    
    const comment = new Comment();
    super(comment);
  }

  // Add method for adding a like to a comment
  async addLike(req, res) {
    try {
      const commentId = req.params.id;

      // Find the comment by ID
      const comment = await this.model.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      // Increment the like count
      comment.likes += 1;

      // Save the updated comment
      await comment.save();

      res.status(200).json({ message: 'Like added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add like' });
    }
  }

  // Add method for adding a dislike to a comment
  async addDislike(req, res) {
    try {
      const commentId = req.params.id;

      // Find the comment by ID
      const comment = await this.model.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      // Increment the dislike count
      comment.dislikes += 1;

      // Save the updated comment
      await comment.save();

      res.status(200).json({ message: 'Dislike added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add dislike' });
    }
  }
}

module.exports = CommentController; 