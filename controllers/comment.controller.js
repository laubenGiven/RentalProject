const BaseController = require('./base.controller');
const Comment = require('../models/comment.models');

class CommentController extends BaseController {
  constructor() {    
    const comment = new Comment();
    super(comment);
  }

  // Add any additional methods specific to the Comment model if needed
}

module.exports = CommentController;
