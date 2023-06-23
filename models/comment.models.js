const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Comment = mongoose.model('Comments', commentSchema);
  
  module.exports = Comment;