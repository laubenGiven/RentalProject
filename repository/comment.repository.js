const BaseRepository = require('./base.repository');
const Comment = require('../models/comment.models');

class CommentRepository extends BaseRepository {
  constructor() {
    super(Comment);
  }

  // Add any additional property-specific methods here
}

module.exports = CommentRepository;
