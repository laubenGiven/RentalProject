const BaseController = require('./base.controller');
const Comment = require('../models/comment.models');
const CommentRepository = require('../repository/comment.repository');

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

  // Add method for adding a comment
  // Add method for adding a comment
// Add method for adding a comment
async add(req, res) {
  try {
    const { property_id, userId, comment, likes, dislikes } = req.body;

    // Find the comment by property_id
    const existingComment = await Comment.findOne({ property_id });

    if (existingComment) {
      // Update the likes and dislikes based on the provided values
      if (likes) {
        existingComment.likes += likes;
      }

      if (dislikes) {
        existingComment.dislikes += dislikes;
      }

      // Update the comment text if provided
      if (comment) {
        existingComment.comment = comment;
      }

      // Save the updated comment
      const savedComment = await existingComment.save();

      res.status(200).json({ message: 'Comment updated successfully', comment: savedComment });
    } else {
      // Create a new comment instance
      const newComment = new Comment({
        property_id,
        userId,
        comment,
        likes: likes || 0,
        dislikes: dislikes || 0,
      });

      // Save the new comment
      const savedComment = await newComment.save();

      res.status(201).json({ message: 'Comment added successfully', comment: savedComment });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add/update comment' });
  }
}



}

module.exports = CommentController;
