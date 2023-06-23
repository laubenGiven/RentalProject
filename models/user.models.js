const mongoose = require('mongoose');
const validator = require('validator');

const objectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    id: {type:objectId, 
        auto:true
    },
  role: {
    type: String,
    enum: ['admin', 'tenant', 'landlord','user'],
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  
    date: {
      type: Date,
      default: Date.now
    }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
